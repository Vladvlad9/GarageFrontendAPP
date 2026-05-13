import {defineStore} from "pinia";
import {getListItemName} from "../api/items_name.ts";
import type {ItemNameListResponse, ServiceItemNameBase} from "../types/items_name.ts";

type LoadStatus = "idle" | "loading" | "saving" | "error";

interface ItemNameState {
    status: LoadStatus
    items: ServiceItemNameBase[]
    error: string | null
    page: number
    pageSize: number
    pageCount: number
}

export const useItemNameStorage = defineStore('itemNameStorage', {
    state: (): ItemNameState => ({
        status: "idle",
        error: null,
        items: [],
        page: 1,
        pageSize: 10,
        pageCount: 1,

    }),
    getters: {},
    actions: {
        async getListItemName() {
            this.status = 'loading'
            this.error = null

            try {
                const itemsName: ItemNameListResponse = await getListItemName()
                this.items = itemsName.results

                this.status = "idle";
            } catch (error) {
                this.error = "error"
                this.error = error instanceof Error ? error.message : "Unknown error";
            } finally {
                this.status = 'idle'
            }
        }
    }
})