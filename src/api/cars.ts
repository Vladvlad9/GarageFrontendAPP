import type {Car, CarCreateRequest, CarListResponse} from "../types/cars.ts";
import {requestJson} from "./client.ts";

export function getCars() {
    return requestJson<CarListResponse>(`/car/`)
}

export function getCar(id: string) {
    return requestJson<Car>(`/car/${id}`)
}

export function createCar(data: CarCreateRequest) {
    return requestJson<Car>(
        `/car/`, {
            method: "POST",
            data: data
        })
}

export function updateCar() {
}

export function deleteCar(id: string) {
    return requestJson(`/car/${id}`, {
        method: "DELETE"
    })
}