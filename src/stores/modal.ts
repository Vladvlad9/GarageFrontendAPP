import {defineStore} from "pinia";

interface ModalState {
    active: string | null;
    payload: string | null;
}

export const useModalStorage = defineStore('modalStorage', {
    state: (): ModalState => ({
        active: null,
        payload: null,
    }),
    getters: {},
    actions: {
        open(name: string, data: string | null = null): void {
            this.active = name
            this.payload = data
        },
        close(): void {
            this.active = null
            this.payload = null
        },
        isOpen(name: string) {
            return this.active === name
        },
    }
})