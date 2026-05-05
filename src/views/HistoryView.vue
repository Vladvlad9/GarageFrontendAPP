<script setup lang="ts">
import {computed} from "vue";
import {useCarsStorage} from "../stores/cars.ts";
import {formatDate, ICON_COLORS} from "../composables/useServiceHelpers.ts";
import IconFuel from "../components/icons/IconFuel.vue";
import IconOil from "../components/icons/IconOil.vue";
import IconAir from "../components/icons/IconAir.vue";
import IconBrake from "../components/icons/IconBrake.vue";
import IconSpark from "../components/icons/IconSpark.vue";
import IconBelt from "../components/icons/IconBelt.vue";
import IconCool from "../components/icons/IconCool.vue";
import IconGear from "../components/icons/IconGear.vue";
import type {ServiceItem} from "../types/cars.ts";

const carStore = useCarsStorage()

const iconMap = {
  oil: IconOil,
  air: IconAir,
  brake: IconBrake,
  spark: IconSpark,
  belt: IconBelt,
  cool: IconCool,
  gear: IconGear,
  fuel: IconFuel,
} as const

const selectedCar = computed(() => carStore.selectedCar)
const serviceItems = computed<ServiceItem[]>(() => selectedCar.value?.serviceItems ?? [])

function findService(name: string) {
  return serviceItems.value.find((service) => service.name === name) ?? null
}

function iconColor(name: string) {
  const service = findService(name)
  if (!service) return '#888'

  const key = service.icon as keyof typeof ICON_COLORS
  return ICON_COLORS[key] || '#888'
}

function iconComponent(name: string) {
  const service = findService(name)
  if (!service) return IconOil

  const key = service.icon as keyof typeof iconMap
  return iconMap[key] || IconOil
}
</script>

<template>
  <div v-if="selectedCar">
    <div v-if="serviceItems.length === 0" class="empty">
      <div class="empty-icon">📋</div>
      <p>История пуста. Отметьте выполненное ТО — и оно появится здесь.</p>
    </div>

    <div v-else>
      <div class="history-group">
        <div class="history-card">
          <div class="card-header">
            <div class="car-dot" :style="{ background: selectedCar.color }"/>
            <div>
              <div class="card-title">{{ selectedCar.name }} '{{ String(selectedCar.year).slice(2) }}</div>
              <div class="card-sub">{{ serviceItems.length }} записей</div>
            </div>
          </div>

          <div
              v-for="(service, i) in serviceItems"
              :key="service.id ?? i"
              class="history-row"
          >
            <div
                class="row-icon"
                :style="{ background: iconColor(service.name) + '18', color: iconColor(service.name) }"
            >
              <component :is="iconComponent(service.name)"/>
            </div>
            <span class="row-name">{{ service.name }}</span>
            <span class="row-km">{{ service.lastKm.toLocaleString('ru') }} км</span>
            <span class="row-date">{{ formatDate(service.lastDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty">
    <div class="empty-icon">📋</div>
    <p>История пуста. Отметьте выполненное ТО — и оно появится здесь.</p>
  </div>
</template>

<style scoped>
.history-group {
  margin-bottom: 16px;
}

.history-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.card-header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 10px;
}

.car-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.card-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
}

.card-sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 1px;
}

.history-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}

.history-row:last-child {
  border-bottom: none;
}

.history-row:hover {
  background: var(--surface2);
}

.row-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.row-icon :deep(svg) {
  width: 13px;
  height: 13px;
}

.row-name {
  flex: 1;
  font-size: 13px;
}

.row-km {
  font-size: 12px;
  color: var(--muted);
  min-width: 80px;
  text-align: right;
}

.row-date {
  font-size: 11px;
  color: var(--dim);
  min-width: 90px;
  text-align: right;
}

.empty {
  text-align: center;
  padding: 60px 24px;
  color: var(--dim);
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.4;
}

.empty p {
  font-size: 13px;
  line-height: 1.6;
}
</style>
