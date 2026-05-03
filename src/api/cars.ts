import type {Car, CarListResponse} from "../types/cars.ts";
import {requestJson} from "./client.ts";

// function buildSearchParams(filters: CarFilters = {}): URLSearchParams {
//     const params: URLSearchParams = new URLSearchParams();
//
//     if (filters.page !== undefined) params.set("page", String(filters.page))
//     if (filters.pageSize !== undefined) params.set("pageSize", String(filters.pageSize))
//     if (filters.q) params.set("q", filters.q)
//     if (filters.sort) params.set("sort", filters.sort)
//     if (filters.sortBy) params.set("sortBy", filters.sortBy)
//     if (filters.fuelType) params.set("fuelType", filters.fuelType)
//     if (filters.transmission) params.set("transmission", filters.transmission)
//
//     return params
// }

export function getCars() {
    return requestJson<CarListResponse>(`/car/`)
}

export function getCar(id: string) {
    return requestJson<Car>(`/car/${id}`)
}

export function createCar() {
}

export function updateCar() {
}

export function deleteCar(id: string) {
    return requestJson(`/car/${id}`, {
        method: "DELETE"
    })
}