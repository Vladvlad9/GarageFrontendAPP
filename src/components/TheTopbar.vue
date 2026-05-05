<script setup lang="ts">
import {useCarsStorage} from "../stores/cars.ts";
import {useModalStorage} from "../stores/modal.ts";

const car = useCarsStorage()
const modal = useModalStorage()

</script>

<template>
  <div class="topbar">
    <template v-if="car.currentCar">
      <div class="topbar-left">
        <div
            class="car-avatar"
            :style="{
            background: car.currentCar.color + '22',
            color: car.currentCar.color,
            border: `1px solid ${car.currentCar.color}44`
          }"
        >
          {{ car.currentCar.initials }}
        </div>
        <div>
          <div class="topbar-title">{{ car.currentCar.name }} '{{ String(car.currentCar.year).slice(2) }}</div>
          <div class="topbar-sub">
            {{ car.currentCar.mileage.toLocaleString('ru') }} км ·
            <span :style="{ color: car.urgentCount > 0 ? 'var(--red)' : 'var(--muted)' }">{{ car.urgentCount }} срочно</span>
            · {{ car.warnCount }} скоро
          </div>
        </div>
      </div>
      <div class="topbar-actions">
        <button class="btn" @click="modal.open('mileage')">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="10" cy="10" r="8"/>
            <path d="M10 6v4l2.5 2.5"/>
          </svg>
          Обновить пробег
        </button>
        <button class="btn btn-primary" @click="modal.open('service')">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M10 4v12M4 10h12"/>
          </svg>
          Отметить ТО
        </button>
      </div>
    </template>
    <!-- <div v-else class="topbar-loading">Загрузка...</div> -->
  </div>
</template>

<style scoped>
.topbar {
  padding: 16px 28px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  flex-shrink: 0;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.car-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
}

.topbar-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
}

.topbar-sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 1px;
}

.topbar-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border2);
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn:hover {
  background: var(--surface2);
  color: var(--text);
}

.btn svg {
  width: 14px;
  height: 14px;
}

.btn-primary {
  background: var(--blue-bg);
  border-color: var(--blue-border);
  color: var(--blue);
}

.btn-primary:hover {
  background: rgba(74, 158, 255, 0.15);
}

.topbar-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  color: var(--muted);
  font-size: 14px;
}
</style>
