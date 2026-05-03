import type {Pagination} from "./pagination.ts";

export type FuelType = "petrol" | "diesel" | "electric" | "gas" | "hybrid";
export type TransmissionType = "manual" | "automatic" | "cvt" | "robot";


export interface ServiceItem {
    id: string;
    car_id: string;
    name: string;
    icon: string;
    interval_km: number;
    interval_days: number;
    last_km: number;
    last_date: string | null;
    warn_at: number;
    notes: string | null;
    is_active: boolean;
    progress: number;
    is_overdue: boolean;
    needs_attention: boolean;
    next_due_km: number | null;
    next_due_date: string | null;
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
    license_plate: string | null;
    engine_volume: number | null;
    fuel_type: FuelType | null;
    transmission: TransmissionType | null;
    notes: string | null;
    serviceItems: ServiceItem[];
    is_archived: boolean;
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
    license_plate?: string | null;
    engine_volume?: number | null;
    fuel_type?: FuelType | null;
    transmission?: TransmissionType | null;
    notes?: string | null;
    is_archived?: boolean;
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
