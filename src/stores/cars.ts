import {defineStore} from "pinia";
import type {Car, ServiceItem} from "../types/cars.ts";
import {getCar, getCars} from "../api/cars.ts";

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
    },
    actions: {
        async getCars() {
            this.status = 'loading'
            this.error = null

            try {
                const cars = await getCars()
                this.items = cars.results

                let selectedFromList = null

                if (this.selectedId) {
                    selectedFromList = this.items.find(car => car.id === this.selectedId) || null
                }

                if (!selectedFromList && this.items.length > 0) selectedFromList = this.items[0]

                this.selectedId = selectedFromList?.id ?? null;
                this.selectedCar = selectedFromList;
                this.serviceItems = selectedFromList?.serviceItems ?? null

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
                return car
            } catch (error) {
                this.status = "error"
                this.error = error instanceof Error ? error.message : "Unknown error"
                return null
            }
        },

        async createCar() {
        },
        async updateCar() {
        },
        async _deleteCar(id: string) {
        },

        async selectCar(id: string) {
            const selected_car = await this._getCar(id)

            if (!selected_car) return

            this.serviceItems = selected_car.serviceItems
        },

        getProgress(item: ServiceItem, car: Car) {
            const NOW = new Date()
            if (item.interval_km > 0) {
                return Math.min((car.mileage - item.last_km) / item.interval_km, 1)
            }
            const last = new Date(item.last_date)
            const days = Math.round((NOW.getTime() - last.getTime()) / 86400000)
            return Math.min(days / item.interval_days, 1)
        },

        toggleSetting(key: 'notifyKm' | 'notifyDays') {
            this.settings[key] = !this.settings[key];
        }
    }
})