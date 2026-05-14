import {requestJson} from "./client.ts";
import type {ServiceItemCoreDTO, ServiceItemCreateDTO, ServiceItemUpdateDTO} from "../types/serviceItem.ts";

export function getServiceItem(id: string) {
    return requestJson<ServiceItemCoreDTO>(`/service_item/${id}`)
}

export function createServiceItem(data: ServiceItemCreateDTO) {
    return requestJson('/service_item/', {
        method: "POST",
        data: data
    })
}

export function updateServiceItem(id: string, data: ServiceItemUpdateDTO) {
    return requestJson<ServiceItemCoreDTO>(`/service_item/${id}`, {
        method: "PATCH",
        data: data
    })
}

export function deleteServiceItem(id: string) {
    return requestJson(`/service_item/${id}`, {
        method: "DELETE",
    })
}
