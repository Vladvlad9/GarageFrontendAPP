import {defineStore} from "pinia";
import type {Car, CarCreateRequest} from "../types/cars.ts";
import {createCar, deleteCar, getCar, getCars} from "../api/cars.ts";
import type {ServiceItem} from "../types/serviceItem.ts";

type LoadStatus = "idle" | "loading" | "saving" | "error";

interface SettingsState {
    notifyKm: boolean,
    notifyDays: boolean,
    warnKmBefore: number,
    warnDaysBefore: number,
}

interface CarsState {
    status: LoadStatus;
    error: string | null;
    items: Car[];
    selectedId: string | null;
    selectedCar: Car | null;
    serviceItems: ServiceItem[] | null,
    page: number;
    pageSize: number;
    pageCount: number;
    settings: SettingsState
}

function calcProgress(item: ServiceItem, car: Car) {
    if (item.intervalKm > 0) {
        return Math.min((car.mileage - item.lastKm) / item.intervalKm, 1)
    }
    if (!item.lastDate) {
        return 0
    }
    const last = new Date(item.lastDate)
    if (Number.isNaN(last.getTime())) {
        return 0
    }
    const days = Math.round((Date.now() - last.getTime()) / 86400000)
    return Math.min(days / item.intervalDays, 1)
}

export const useCarsStorage = defineStore('carsStorage', {
    state: (): CarsState => ({
        status: "idle",
        error: null,
        items: [],
        selectedId: null,
        selectedCar: null,
        serviceItems: null,
        page: 1,
        pageSize: 10,
        pageCount: 1,

        settings: {
            notifyKm: true,
            notifyDays: true,
            warnKmBefore: 1000,
            warnDaysBefore: 30,
        },
    }),
    getters: {
        hasCars: (state) => state.items.length > 0,
        currentCar: (state): Car | null => state.selectedCar ?? state.items[0] ?? null,
        currentServices(): ServiceItem[] {
            return this.currentCar?.serviceItems ?? [];
        },
        urgentCount(): number {
            const car = this.selectedCar ?? this.items[0] ?? null
            if (!car) return 0

            return car.serviceItems.filter((service) => calcProgress(service, car) >= 1).length
        },
        warnCount(): number {
            const car = this.selectedCar ?? this.items[0] ?? null
            if (!car) return 0

            return car.serviceItems.filter((service) => {
                const progress = calcProgress(service, car)
                return progress >= service.warnAt && progress < 1
            }).length
        },
        okCount(): number {
            const car = this.selectedCar ?? this.items[0] ?? null
            if (!car) return 0

            return car.serviceItems.filter((service) => calcProgress(service, car) < service.warnAt).length
        },
        recentServices(): ServiceItem[] {
            return [...(this.currentCar?.serviceItems ?? [])].sort((a, b) => {
                const aTime = a.lastDate ? new Date(a.lastDate).getTime() : 0
                const bTime = b.lastDate ? new Date(b.lastDate).getTime() : 0
                return bTime - aTime
            }).slice(0, 5)
        }
    },
    actions: {
        clearCars() {
            this.status = "idle";
            this.error = null;
            this.items = [];
            this.selectedId = null;
            this.selectedCar = null;
            this.serviceItems = null;
            this.page = 1;
            this.pageCount = 1;
        },

        async getCars() {
            this.status = 'loading'
            this.error = null

            try {
                const cars = await getCars()
                this.items = cars.results

                let selectedId = this.selectedId
                if (selectedId && !this.items.some(car => car.id === selectedId)) {
                    selectedId = null
                }

                if (!selectedId && this.items.length > 0) {
                    selectedId = this.items[0].id
                }

                this.selectedId = selectedId

                if (selectedId) {
                    const selectedCar = await getCar(selectedId)
                    this.selectedCar = selectedCar
                    this.serviceItems = selectedCar.serviceItems ?? null
                } else {
                    this.selectedCar = null
                    this.serviceItems = null
                }

                this.status = "idle";
            } catch (error) {
                this.status = "error";
                this.error = error instanceof Error ? error.message : "Unknown error";
            } finally {
                this.status = 'idle'
            }
        },

        async _getCar(id: string) {
            this.status = 'loading'
            this.error = null

            try {
                const car: Car = await getCar(id)
                this.selectedCar = car
                this.selectedId = car.id

                this.status = 'idle'
                return car
            } catch (error) {
                this.status = "error"
                this.error = error instanceof Error ? error.message : "Unknown error"
                return null
            }
        },

        async createCar(data: CarCreateRequest) {
            this.status = 'loading'
            this.error = null

            try {
                await createCar(data)
                await this.getCars()
            } catch (error) {
                this.status = 'error'
                this.error = error instanceof Error ? error.message : "Unknown error"
            } finally {
                this.status = 'idle'
            }
        },

        async updateCar() {
        },

        async _deleteCar(_id: string) {
            this.status = 'loading'
            this.error = null

            try {
                await deleteCar(_id)
                await this.getCars()
            } catch (error) {
                this.status = 'error'
                this.error = error instanceof Error ? error.message : "Unknown error"
            } finally {
                this.status = 'idle'
            }
        },

        async selectCar(id: string) {
            const selected_car = await this._getCar(id)

            if (!selected_car) return

            this.serviceItems = selected_car.serviceItems
        },

        getProgress(item: ServiceItem, car: Car) {
            const NOW = new Date()
            if (item.intervalKm > 0) {
                return Math.min((car.mileage - item.lastKm) / item.intervalKm, 1)
            }
            if (!item.lastDate) {
                return 0
            }
            const last = new Date(item.lastDate)
            if (Number.isNaN(last.getTime())) {
                return 0
            }
            const days = Math.round((NOW.getTime() - last.getTime()) / 86400000)
            return Math.min(days / item.intervalDays, 1)
        },

        getKmLeft(item: ServiceItem, car: Car) {
            if (item.intervalKm <= 0) {
                return null
            }

            return Math.max(item.lastKm + item.intervalKm - car.mileage, 0)
        },

        getDaysLeft(item: ServiceItem) {
            if (item.intervalDays <= 0 || !item.lastDate) {
                return null
            }

            const last = new Date(item.lastDate)
            if (Number.isNaN(last.getTime())) {
                return null
            }

            const dueAt = last.getTime() + item.intervalDays * 86400000
            return Math.ceil((dueAt - Date.now()) / 86400000)
        },

        toggleSetting(key: 'notifyKm' | 'notifyDays') {
            this.settings[key] = !this.settings[key];
        }
    }
})
