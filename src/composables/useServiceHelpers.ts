export const ICON_COLORS = {
    oil: '#FF9800',
    air: '#2196F3',
    brake: '#E91E63',
    spark: '#FFC107',
    belt: '#4CAF50',
    cool: '#00BCD4',
    gear: '#9C27B0',
    fuel: '#FF5722',
} as const

type BadgeItem = {
    warnAt: number;
}

type ProgressStore = {
    getKmLeft(item: BadgeItem, car: unknown): number | null;
    getDaysLeft(item: BadgeItem): number | null;
}

export function getBadge(p: number, item: BadgeItem) {
    if (p >= 1) return {label: 'Заменить', cls: 'badge-danger'}
    if (p >= item.warnAt) return {label: 'Скоро', cls: 'badge-warn'}
    return {label: 'OK', cls: 'badge-ok'}
}

export function getBarColor(p: number, item: BadgeItem) {
    if (p >= 1) return '#f87171'
    if (p >= item.warnAt) return '#fbbf24'
    return '#4ade80'
}

export function formatDate(d: string | null) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ru', {day: 'numeric', month: 'short', year: 'numeric'})
}

export function useServiceHelpers(store: ProgressStore) {
    function getMeta(item: BadgeItem, car: unknown) {
        const kmLeft = store.getKmLeft(item, car)
        if (kmLeft !== null) {
            if (kmLeft === 0) return 'Пробег исчерпан'
            return 'Осталось ' + kmLeft.toLocaleString('ru') + ' км'
        }
        const d = store.getDaysLeft(item)
        if (d !== null) {
            if (d < 0) return 'Просрочено на ' + Math.abs(d) + ' дн.'
            return 'Осталось ' + d + ' дн.'
        }
        return ''
    }

    return {getMeta}
}
