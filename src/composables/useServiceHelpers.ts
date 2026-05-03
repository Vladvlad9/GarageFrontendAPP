export const ICON_COLORS = {
    oil: '#FF9800',
    air: '#2196F3',
    brake: '#E91E63',
    spark: '#FFC107',
    belt: '#4CAF50',
    cool: '#00BCD4',
    gear: '#9C27B0',
    fuel: '#FF5722',
}

export function getBadge(p, item) {
    if (p >= 1) return {label: 'Заменить', cls: 'badge-danger'}
    if (p >= item.warnAt) return {label: 'Скоро', cls: 'badge-warn'}
    return {label: 'OK', cls: 'badge-ok'}
}

export function getBarColor(p, item) {
    if (p >= 1) return '#f87171'
    if (p >= item.warnAt) return '#fbbf24'
    return '#4ade80'
}

export function formatDate(d) {
    return new Date(d).toLocaleDateString('ru', {day: 'numeric', month: 'short', year: 'numeric'})
}

export function useServiceHelpers(store) {
    function getMeta(item, car) {
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
