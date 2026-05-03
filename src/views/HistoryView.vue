<script setup lang="ts">
import {useCarsStorage} from "../stores/cars.ts";

const carStore = useCarsStorage()
console.log(`carStore.serviceItems ${carStore.serviceItems}`)

// const hasAnyHistory = computed(() => carStore.items.some(c => (carStore.serviceItems || []).length > 0))
function findService(carId, name) {
  return carStore.selectedCar.serviceItems.find(s => s.name === name)
}

function iconColor(carId, name) {
  const s = findService(carId, name)
  return s ? (ICON_COLORS[s.icon] || '#888') : '#888'
}

function iconComponent(carId, name) {
  const s = findService(carId, name)
  return s ? (iconMap[s.icon] || IconOil) : IconOil
}
</script>

<template>
  <div>
    <div v-if="carStore.selectedCar.serviceItems">
      <div v-for="car in carStore.items" :key="car.id" class="history-group">
        <div v-if="carStore.selectedCar.serviceItems.length > 0" class="history-card">
          <div class="card-header">
            <div class="car-dot" :style="{ background: car.color }"/>
            <div>
              <div class="card-title">{{ car.name }} '{{ String(car.year).slice(2) }}</div>
              <div class="card-sub">{{ (carStore.serviceItems || []).length }} записей</div>
            </div>
          </div>
          <div
              v-for="(h, i) in carStore.serviceItems"
              :key="i"
              class="history-row"
          >
            <div
                class="row-icon"
                :style="{ background: iconColor(car.id, h.name) + '18', color: iconColor(car.id, h.name) }"
            >
              <component :is="iconComponent(car.id, h.name)"/>
            </div>
            <span class="row-name">{{ h.name }}</span>
            <span class="row-km">{{ h.km.toLocaleString('ru') }} км</span>
            <span class="row-date">{{ formatDate(h.date) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <div class="empty-icon">📋</div>
      <p>История пуста. Отметьте выполненное ТО — и оно появится здесь.</p>
    </div>
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