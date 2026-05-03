import {defineStore} from "pinia";
import type {Car} from "../types/cars.ts";
import {getCars} from "../api/cars.ts";

type LoadStatus = "idle" | "loading" | "saving" | "error";


interface CarsState {
    status: LoadStatus;
    error: string | null;
    items: Car[];
    selectedId: string | null;
    selectedCar: Car | null;
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

        async getCar() {
        },
        async createCar() {
        },
        async updateCar() {
        },
        async deleteCar() {
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