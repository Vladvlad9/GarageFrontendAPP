import type {Pagination} from "./pagination.ts";

export interface ServiceItemNameBase {
    id: string
    name: string
    icon: string
}

export interface ItemNameCreateDTO {
    name: string
    icon: string
}

export interface ItemNameUpdateDTO {
    name?: string | null
    icon?: string | null
}

export interface ItemNameListResponse {
    results: ServiceItemNameBase[];
    pagination: Pagination;
}