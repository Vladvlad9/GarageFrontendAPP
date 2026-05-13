import type {Pagination} from "./pagination.ts";
import type {ServiceItemNameBase} from "./items_name.ts";

export type FuelType = "petrol" | "diesel" | "electric" | "gas" | "hybrid";
export type TransmissionType = "manual" | "automatic" | "cvt" | "robot";


export interface ServiceItem {
    id: string;
    car_id: string;
    // name: string;
    serviceItemName: ServiceItemNameBase
    icon: string;
    intervalKm: number;
    intervalDays: number;
    lastKm: number;
    lastDate: string | null;
    warnAt: number;
    notes: string | null;
    isActive: boolean;
    progress: number;
    isOverdue: boolean;
    needsAttention: boolean;
    nextDueKm: number | null;
    nextDueDate: string | null;
}

export interface Car {
    id: string;
    name: string;
    brand: string;
    model: string;
    color: string;
    year: number;
    mileage: number;
    vin: string | null;
    licensePlate: string | null;
    engineVolume: number | null;
    fuelType: FuelType | null;
    transmission: TransmissionType | null;
    notes: string | null;
    serviceItems: ServiceItem[];
    isArchived: boolean;
    created_at: string;
    updated_at: string | null;
    initials?: string | null;
}

export interface CarListResponse {
    results: Car[];
    pagination: Pagination;
}

export interface CarCreateRequest {
    brand: string;
    model: string;
    year: number;
    mileage: number;
}

export interface CarUpdateRequest {
    brand?: string;
    model?: string;
    color?: string;
    year?: number;
    mileage?: number;
    vin?: string | null;
    licensePlate?: string | null;
    engineVolume?: number | null;
    fuelType?: FuelType | null;
    transmission?: TransmissionType | null;
    notes?: string | null;
    isArchived?: boolean;
}

export interface CarFilters {
    page?: number;
    pageSize?: number;
    q?: string;
    sortBy?: "id";
    sort?: "asc" | "desc";
    fuelType?: FuelType | null;
    transmission?: TransmissionType | null;
}
