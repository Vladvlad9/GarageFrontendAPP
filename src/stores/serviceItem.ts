import {defineStore} from "pinia";
import type {ServiceItemCreateDTO} from "../types/serviceItem.ts";
import {createServiceItem} from "../api/serviceItem.ts";

type LoadStatus = "idle" | "loading" | "saving" | "error";

interface ServiceItemState {
    status: LoadStatus;
    error: string | null
}

export const useServiceItemStorage = defineStore('serviceItemStorage', {
    state: (): ServiceItemState => ({
        status: "idle",
        error: null,
    }),
    getters: {},
    actions: {
        async getServiceItem() {
        },
        async createServiceItem(data: ServiceItemCreateDTO) {
            this.status = 'loading'
            this.error = null
            try {
                await createServiceItem(data)
            } catch (error) {
                this.status = "error"
                this.error = error instanceof Error ? error.message : "Unknown error"
            } finally {
                this.status = "idle"
            }
        },
        async updateServiceItem() {
        },
        async deleteServiceItem() {
        },
    }
})