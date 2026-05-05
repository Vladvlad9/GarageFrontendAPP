<script setup lang="ts">
import {useCarsStorage} from "../stores/cars.ts";

const car = useCarsStorage()
</script>

<template>
  <div>
    <!-- Notifications -->
    <div class="settings-section">
      <div class="section-title">Уведомления</div>
      <div class="settings-card">
        <div class="settings-row">
          <div class="settings-label">
            <div class="settings-name">По пробегу</div>
            <div class="settings-desc">Напоминать когда подходит пробег замены</div>
          </div>
          <div class="toggle" @click="car.toggleSetting('notifyKm')">
            <div class="toggle-knob"/>
          </div>
        </div>
        <div class="settings-row">
          <div class="settings-label">
            <div class="settings-name">По дате</div>
            <div class="settings-desc">Напоминать когда подходит срок по времени</div>
          </div>
          <div class="toggle" :class="{ on: car.settings.notifyDays }" @click="car.toggleSetting('notifyDays')">
            <div class="toggle-knob"/>
          </div>
        </div>
        <div class="settings-row">
          <div class="settings-label">
            <div class="settings-name">Предупреждать за, км</div>
            <div class="settings-desc">Показывать статус «Скоро» за N км до замены</div>
          </div>
          <input
              class="settings-input"
              type="number"
              v-model.number="car.settings.warnKmBefore"
          />
        </div>
        <div class="settings-row">
          <div class="settings-label">
            <div class="settings-name">Предупреждать за, дней</div>
            <div class="settings-desc">Для интервалов по времени</div>
          </div>
          <input
              class="settings-input"
              type="number"
              v-model.number="car.settings.warnDaysBefore"
          />
        </div>
      </div>
    </div>

    <!-- Cars -->
    <div class="settings-section">
      <div class="section-title">Автомобили</div>
      <div class="settings-card">
        <div v-for="carItem in car.items" :key="carItem.id" class="settings-row">
          <div class="settings-label">
            <div class="settings-name" style="display:flex;align-items:center;gap:8px">
              <div class="car-dot" :style="{ background: carItem.color }"/>
              {{ carItem.name }} '{{ String(carItem.year).slice(2) }}
            </div>
            <div class="settings-desc">{{ carItem.mileage.toLocaleString('ru') }} км</div>
          </div>
          <button class="btn-danger" @click="car._deleteCar(carItem.id)">Удалить</button>
        </div>
      </div>
    </div>

    <!-- About -->
    <div class="settings-section">
      <div class="section-title">О приложении</div>
      <div class="settings-card">
        <div class="settings-row">
          <div class="settings-label">
            <div class="settings-name">Версия</div>
          </div>
          <span class="settings-value">1.0.0</span>
        </div>
        <div class="settings-row">
          <div class="settings-label">
            <div class="settings-name">Стек</div>
          </div>
          <span class="settings-value">Vue 3 + Pinia + FastAPI + PostgreSQL</span>
        </div>
        <div class="settings-row">
          <div class="settings-label">
            <div class="settings-name">Роутер</div>
          </div>
          <span class="settings-value">Vue Router 4</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-section {
  margin-bottom: 24px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
}

.settings-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.settings-row {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  gap: 14px;
}

.settings-row:last-child {
  border-bottom: none;
}

.settings-label {
  flex: 1;
}

.settings-name {
  font-size: 13px;
  font-weight: 500;
}

.settings-desc {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.settings-value {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
}

.settings-input {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  width: 100px;
  outline: none;
  transition: border-color 0.15s;
}

.settings-input:focus {
  border-color: var(--blue);
}

.toggle {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: var(--surface2);
  border: 1px solid var(--border2);
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.toggle.on {
  background: var(--blue);
  border-color: var(--blue);
}

.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--muted);
  transition: all 0.2s;
}

.toggle.on .toggle-knob {
  left: 20px;
  background: #fff;
}

.car-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.btn-danger {
  font-size: 11px;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(248, 113, 113, 0.2);
  background: transparent;
  color: var(--red);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-danger:hover {
  background: var(--red-bg);
}
</style>
