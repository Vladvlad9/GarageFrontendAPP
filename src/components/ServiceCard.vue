<script setup lang="ts">
import {computed} from 'vue'
import type {Car, ServiceItem} from "../types/cars.ts";
import {useCarsStorage} from "../stores/cars.ts";
import IconFuel from "./icons/IconFuel.vue";
import IconOil from "./icons/IconOil.vue";
import IconAir from "./icons/IconAir.vue";
import IconBrake from "./icons/IconBrake.vue";
import IconSpark from "./icons/IconSpark.vue";
import IconBelt from "./icons/IconBelt.vue";
import IconCool from "./icons/IconCool.vue";
import IconGear from "./icons/IconGear.vue";
import {getBadge, getBarColor, ICON_COLORS} from "../composables/useServiceHelpers.ts";

const iconMap = {
  oil: IconOil,
  air: IconAir,
  brake: IconBrake,
  spark: IconSpark,
  belt: IconBelt,
  cool: IconCool,
  gear: IconGear,
  fuel: IconFuel
}

const props = defineProps<{
  service: ServiceItem
  car: Car
}>()
const emit = defineEmits(['click'])
const store = useCarsStorage()

const iconColor = computed(() => {
  const key = props.service.icon as keyof typeof ICON_COLORS
  return ICON_COLORS[key] || '#888'
})
const iconComponent = computed(() => {
  const key = props.service.icon as keyof typeof iconMap
  return iconMap[key] || IconOil
})

const progress = computed(() => store.getProgress(props.service, props.car))
const pct = computed(() => Math.min(Math.round(progress.value * 100), 100))
const isUrgent = computed(() => progress.value >= 1)
const badge = computed(() => getBadge(progress.value, props.service))
const barColor = computed(() => getBarColor(progress.value, props.service))



const meta = computed(() => {
  const kmLeft = store.getKmLeft(props.service, props.car)

  if (kmLeft !== null) {
    if (kmLeft === 0) return 'Пробег исчерпан'
    return 'Осталось ' + kmLeft.toLocaleString('ru') + ' км'
  }
  const d = store.getDaysLeft(props.service)

  if (d !== null) {
    if (d < 0) return 'Просрочено на ' + Math.abs(d) + ' дн.'
    return 'Осталось ' + d + ' дн.'
  }
  return ''
})

const rangeText = computed(() => {
  if (props.service.intervalKm > 0) {
    return `${props.service.lastKm.toLocaleString('ru')} → ${(props.service.lastKm + props.service.intervalKm).toLocaleString('ru')} км`
  }

  if (props.service.intervalDays > 0) {
    return `каждые ${Math.round(props.service.intervalDays / 365)} г.`
  }

  return 'без интервала'
})
</script>

<template>
  <div class="service-card" :class="{ urgent: isUrgent }" @click="emit('click')">
    <div class="sc-head">
      <div class="sc-icon" :style="{ background: iconColor + '18', color: iconColor }">
        <component :is="iconComponent"/>
      </div>
      <div>
        <div class="sc-name">{{ service.name }}</div>
        <div class="sc-meta">{{ meta }}</div>
      </div>
    </div>
    <div class="progress">
      <div class="progress-fill" :style="{ width: pct + '%', background: barColor }"/>
    </div>
    <div class="sc-footer">
      <span class="sc-range">{{ rangeText }}</span>
      <span class="badge" :class="badge.cls">{{ badge.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s;
}

.service-card:hover {
  border-color: var(--border2);
  background: var(--surface2);
}

.service-card.urgent {
  border-color: rgba(248, 113, 113, 0.2);
}

.sc-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.sc-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sc-icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.sc-name {
  font-size: 13px;
  font-weight: 500;
}

.sc-meta {
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
}

.progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s;
}

.sc-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.sc-range {
  font-size: 11px;
  color: var(--dim);
}

.badge {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 500;
}

.badge-ok {
  background: var(--green-bg);
  color: var(--green);
  border: 1px solid rgba(74, 222, 128, 0.15);
}

.badge-warn {
  background: var(--amber-bg);
  color: var(--amber);
  border: 1px solid rgba(251, 191, 36, 0.15);
}

.badge-danger {
  background: var(--red-bg);
  color: var(--red);
  border: 1px solid rgba(248, 113, 113, 0.15);
}
</style>
