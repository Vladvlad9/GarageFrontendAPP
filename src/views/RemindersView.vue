<script setup lang="ts">
</script>

<template>
<!--  <div>-->
<!--    <div v-if="store.allReminders.length === 0" class="empty">-->
<!--      <div class="empty-icon">✅</div>-->
<!--      <p>Всё в порядке — нет срочных задач</p>-->
<!--    </div>-->
<!--    <div v-else>-->
<!--      <div-->
<!--          v-for="({ car, service, p }, i) in store.allReminders"-->
<!--          :key="i"-->
<!--          class="reminder-card"-->
<!--          :class="p >= 1 ? 'urgent' : 'warn'"-->
<!--      >-->
<!--        <div-->
<!--            class="rem-icon"-->
<!--            :style="{ background: iconColor(service) + '18', color: iconColor(service) }"-->
<!--        >-->
<!--          <component :is="iconComponent(service)"/>-->
<!--        </div>-->
<!--        <div class="rem-body">-->
<!--          <div class="rem-name">{{ service.name }}</div>-->
<!--          <div class="rem-sub">{{ getMeta(service, car) }}</div>-->
<!--          <div class="rem-car" :style="{ color: car.color }">-->
<!--            {{ car.name }} '{{ String(car.year).slice(2) }}-->
<!--          </div>-->
<!--        </div>-->
<!--        <div>-->
<!--          <span class="badge" :class="badge(p, service).cls">{{ badge(p, service).label }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>
.reminder-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.15s;
}

.reminder-card:hover {
  border-color: var(--border2);
}

.reminder-card.urgent {
  border-color: rgba(248, 113, 113, 0.25);
  background: rgba(248, 113, 113, 0.03);
}

.reminder-card.warn {
  border-color: rgba(251, 191, 36, 0.2);
  background: rgba(251, 191, 36, 0.02);
}

.rem-icon {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rem-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.rem-body {
  flex: 1;
}

.rem-name {
  font-size: 14px;
  font-weight: 500;
}

.rem-sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.rem-car {
  font-size: 11px;
  margin-top: 4px;
}

.badge {
  font-size: 11px;
  padding: 4px 10px;
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

.empty {
  text-align: center;
  padding: 60px 24px;
  color: var(--dim);
}

.empty-icon {
  font-size: 36px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty p {
  font-size: 13px;
}
</style>
