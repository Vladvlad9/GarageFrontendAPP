import {requestJson} from "./client.ts";
import type {
    ItemNameCreateDTO,
    ItemNameListResponse,
    ItemNameUpdateDTO,
    ServiceItemNameBase
} from "../types/items_name.ts";

export function getListItemName() {
    return requestJson<ItemNameListResponse>("/service_item_name/")
}

export function getItemName(id: string) {
    return requestJson<ServiceItemNameBase>(`/service_item_name/${id}`)
}

export function createItemName(data: ItemNameCreateDTO) {
    return requestJson<ServiceItemNameBase>('/service_item_name/', {
        method: "POST",
        data: data
    })
}

export function updateItemName(id: string, data: ItemNameUpdateDTO) {
    return requestJson<ServiceItemNameBase>(`/service_item_name/${id}`, {
        method: "PATCH",
        data: data
    })
}

export function deleteItemName(id: string) {
    return requestJson(`/service_item_name/${id}`, {
        method: "DELETE"
    })
}