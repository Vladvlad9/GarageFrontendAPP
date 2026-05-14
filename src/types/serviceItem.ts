import type {ServiceItemNameBase} from "./items_name.ts";

export interface ServiceItem {
    id: string;
    carId: string;
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

export interface ServiceItemCoreDTO {
    id: string;
    carId: string;
    service_item_name_id: string;
    intervalKm: number;
    intervalDays: number;
    lastKm: number;
    lastDate: string | null;
    warnAt: number;
    notes: string | null;
    isActive: boolean;
}


export interface ServiceItemCreateDTO {
    carId: string;
    serviceItemNameId: string;
    lastKm: number;
    lastDate: string;
}

export interface ServiceItemUpdateDTO {
    lastKm: number;
    lastDate: string;
}