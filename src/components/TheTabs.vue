<script setup lang="ts">
import {useCarsStorage} from "../stores/cars.ts";

const car = useCarsStorage()
const reminderCount = 0
</script>

<template>
  <div class="tabs" v-if="car.status !== 'loading'">
    <RouterLink to="/overview" class="tab" active-class="active">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="2" y="3" width="7" height="7" rx="1"/>
        <rect x="11" y="3" width="7" height="7" rx="1"/>
        <rect x="2" y="12" width="7" height="6" rx="1"/>
        <rect x="11" y="12" width="7" height="6" rx="1"/>
      </svg>
      Обзор
    </RouterLink>
    <RouterLink to="/history" class="tab" active-class="active">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="10" cy="10" r="8"/>
        <path d="M10 6v4l2.5 2.5"/>
      </svg>
      История
    </RouterLink>
    <RouterLink to="/reminders" class="tab" active-class="active">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M10 2a6 6 0 0 1 6 6v3l1.5 3H2.5L4 11V8a6 6 0 0 1 6-6z"/>
        <path d="M8 17a2 2 0 0 0 4 0"/>
      </svg>
      Напоминания
      <span class="tab-count" :class="{ ok: reminderCount === 0 }">{{ reminderCount }}</span>
    </RouterLink>
    <RouterLink to="/settings" class="tab" active-class="active">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="10" cy="10" r="2.5"/>
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/>
      </svg>
      Настройки
    </RouterLink>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  padding: 0 28px;
  background: var(--surface);
  flex-shrink: 0;
}

.tab {
  padding: 12px 16px;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  white-space: nowrap;
}

.tab:hover {
  color: var(--text);
}

.tab.active {
  color: var(--blue);
  border-bottom-color: var(--blue);
}

.tab-count {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 10px;
  background: var(--red-bg);
  color: var(--red);
  border: 1px solid rgba(248, 113, 113, 0.15);
}

.tab-count.ok {
  background: var(--green-bg);
  color: var(--green);
  border-color: rgba(74, 222, 128, 0.15);
}
</style>