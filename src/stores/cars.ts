import {defineStore} from "pinia";
import type {Car, ServiceItem} from "../types/cars.ts";
import {getCar, getCars} from "../api/cars.ts";

type LoadStatus = "idle" | "loading" | "saving" | "error";


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

                const selectedFromList =
                    (this.selectedId ? this.items.find((car) => car.id === this.selectedId) : null) ??
                    this.items[0] ??
                    null;

                this.selectedId = selectedFromList?.id ?? null;
                this.selectedCar = selectedFromList;

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
                this.status = "error";
                this.error = error instanceof Error ? error.message : "Unknown error";
            } finally {
                this.status = 'idle'
            }
        },
        async createCar() {
        },
        async updateCar() {
        },
        async deleteCar() {
        },
        async selectCar(id: string) {
            const selected_car: Car = await this._getCar(id)
            this.selectedCar = selected_car
            this.selectedId = selected_car.id
            this.serviceItems = selected_car.serviceItems
        },
        getProgress(item, car: Car) {
            const NOW = new Date()
            if (item.intervalKm > 0) {
                return Math.min((car.mileage - item.lastKm) / item.intervalKm, 1)
            }
            const last = new Date(item.lastDate)
            const days = Math.round((NOW.getTime() - last.getTime()) / 86400000)
            return Math.min(days / item.intervalDays, 1)
        }
    }
})