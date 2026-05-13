<script setup lang="ts">
import {useCarsStorage} from "../stores/cars.ts";
import {useModalStorage} from "../stores/modal.ts";
import ServiceCard from "../components/ServiceCard.vue";

const car = useCarsStorage()
const modal = useModalStorage()

</script>

<template>
  <!-- Нет автомобилей -->
  <div v-if="car.items.length === 0" class="empty-state">
    <div class="empty-icon">
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="4" y="24" width="56" height="30" rx="6"/>
        <path d="M12 24V20a20 20 0 0 1 40 0v4"/>
        <circle cx="20" cy="39" r="5"/>
        <circle cx="44" cy="39" r="5"/>
        <path d="M25 39h14"/>
      </svg>
    </div>
    <h2>Нет автомобилей</h2>
    <p>Добавьте первый автомобиль чтобы начать отслеживать техническое обслуживание</p>
    <button class="empty-btn" @click="modal.open('addCar')">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 4v12M4 10h12"/>
      </svg>
      Добавить автомобиль
    </button>
  </div>

  <!-- Есть автомобиль -->
  <div v-else-if="car.currentCar">
    <div v-if="car.currentCar.year >= 20" class="age-warn">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M10 2l8 16H2z"/>
        <path d="M10 9v4"/>
        <circle cx="10" cy="15" r="0.5" fill="currentColor"/>
      </svg>
      Возраст авто — {{ car.currentCar.year }} лет. Рекомендуем сократить интервалы ТО и чаще проверять патрубки и
      уплотнители.
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Требует замены</div>
        <div class="metric-value" :class="car.urgentCount > 0 ? 'red' : 'green'">
          {{ car.urgentCount }}
        </div>
        <div class="metric-sub">срочно</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Скоро заменить</div>
        <div class="metric-value" :class="car.warnCount > 0 ? 'amber' : 'green'">
          {{ car.warnCount }}
        </div>
        <div class="metric-sub">в ближайшее время</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">В норме</div>
        <div class="metric-value green">{{ car.okCount }}</div>
        <div class="metric-sub">регламентов</div>
      </div>
    </div>

    <div class="section-title">Регламенты ТО</div>
    <div class="service-grid">
      <ServiceCard
          v-for="service in car.currentServices"
          :key="service.id"
          :service="service"
          :car="car.currentCar"
          @click="modal.open('service', service.id)"
      />
    </div>

    <div class="section-title">Последние записи</div>
    <div class="history-card">
      <div v-if="car.currentServices.length === 0" class="empty">Нет записей</div>
      <div
          v-for="(service, id) in car.recentServices"
          :key="id"
          class="history-row"
      >
        <div class="hist-dot" style="background: #4ade80"/>
        <span class="hist-name">{{ service.serviceItemName.name }}</span>
        <span class="hist-km">{{ service.lastKm.toLocaleString('ru') }} км</span>
        <span class="hist-date">{{ service.lastDate ?? '—' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 16px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--blue-bg);
  border: 1px solid var(--blue-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
  stroke: var(--blue);
}

.empty-state h2 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
}

.empty-state p {
  font-size: 14px;
  color: var(--muted);
  max-width: 300px;
  line-height: 1.6;
}

.empty-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--blue-bg);
  border: 1px solid var(--blue-border);
  border-radius: var(--radius-sm);
  color: var(--blue);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.empty-btn:hover {
  background: rgba(74, 158, 255, 0.15);
}

.age-warn {
  background: rgba(251, 191, 36, 0.06);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  color: var(--amber);
  display: flex;
  align-items: center;
  gap: 10px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.metric-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
}

.metric-label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.metric-value {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.metric-value.red {
  color: var(--red);
}

.metric-value.amber {
  color: var(--amber);
}

.metric-value.green {
  color: var(--green);
}

.metric-sub {
  font-size: 11px;
  color: var(--dim);
  margin-top: 4px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}

.history-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.history-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 16px;
  border-bottom: 1px solid var(--border);
  transition: background 0.15s;
}

.history-row:last-child {
  border-bottom: none;
}

.history-row:hover {
  background: var(--surface2);
}

.hist-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.hist-name {
  flex: 1;
  font-size: 13px;
}

.hist-km {
  font-size: 12px;
  color: var(--muted);
  min-width: 80px;
  text-align: right;
}

.hist-date {
  font-size: 12px;
  color: var(--dim);
  min-width: 100px;
  text-align: right;
}

.empty {
  padding: 24px;
  text-align: center;
  color: var(--dim);
  font-size: 13px;
}
</style>
