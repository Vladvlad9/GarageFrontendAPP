<script setup lang="ts">
import {useModalStorage} from "../stores/modal.ts";
import {useCarsStorage} from "../stores/cars.ts";
import {useAuthStore} from "../stores/auth.ts";
import {useRouter} from "vue-router";

const modal = useModalStorage()
const carStorage = useCarsStorage()
const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.signOut()
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg viewBox="0 0 20 20" fill="none" stroke-width="1.5">
          <rect x="2" y="8" width="16" height="10" rx="2"/>
          <path d="M5 8V6a5 5 0 0 1 10 0v2"/>
          <circle cx="10" cy="13" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      </div>
      <span class="logo-text">Гараж</span>
    </div>

    <nav class="nav">
      <div class="nav-label">Навигация</div>
      <RouterLink to="/overview" class="nav-item" active-class="active">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="3" width="7" height="7" rx="1"/>
          <rect x="11" y="3" width="7" height="7" rx="1"/>
          <rect x="2" y="12" width="7" height="6" rx="1"/>
          <rect x="11" y="12" width="7" height="6" rx="1"/>
        </svg>
        Обзор
      </RouterLink>
      <RouterLink to="/history" class="nav-item" active-class="active">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="10" cy="10" r="8"/>
          <path d="M10 6v4l2.5 2.5"/>
        </svg>
        История ТО
      </RouterLink>
      <RouterLink to="/reminders" class="nav-item" active-class="active">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M10 2a6 6 0 0 1 6 6v3l1.5 3H2.5L4 11V8a6 6 0 0 1 6-6z"/>
          <path d="M8 17a2 2 0 0 0 4 0"/>
        </svg>
        Напоминания
<!--        <span v-if="100" class="nav-badge">{{ 100 }}</span>-->
        <span class="nav-badge">{{ 100 }}</span>
      </RouterLink>
      <RouterLink to="/settings" class="nav-item" active-class="active">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="10" cy="10" r="2.5"/>
          <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/>
        </svg>
        Настройки
      </RouterLink>
    </nav>

    <div class="car-section">
      <div class="car-label">Мои авто</div>
      <div
        v-for="car in carStorage.items"
        :key="car.id"
        class="car-item"
        :class="{ active: car.id === carStorage.selectedId }"
        @click="carStorage.selectCar(car.id)"
      >
        <div class="car-dot" :style="{ background: car.color }"/>
        <span class="car-name">{{ car.name }} '{{ String(car.year).slice(2) }}</span>
        <span  class="car-urgent">
          {{ 500 }}
        </span>
      </div>
      <div class="add-car" @click="modal.open('addCar')">
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 4v12M4 10h12"/>
        </svg>
        Добавить авто
      </div>

      <div class="logout" @click="handleLogout">
        <div class="logout-avatar">{{ "VV" }}</div>
        <div class="logout-info">
          <div class="logout-name">{{ 'Аккаунт' }}</div>
          <div class="logout-email">{{ "vv@gm.cm" }}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M13 15l4-4-4-4M17 11H7"/>
          <path d="M7 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>
        </svg>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-logo {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--blue-bg);
  border: 1px solid var(--blue-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 16px;
  height: 16px;
  stroke: var(--blue);
}

.logo-text {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.nav {
  padding: 12px 8px;
}

.nav-label {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--dim);
  padding: 8px 12px 4px;
  text-transform: uppercase;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  color: var(--muted);
  font-size: 13px;
  text-decoration: none;
  transition: all 0.15s;
  margin-bottom: 1px;
}

.nav-item:hover {
  background: var(--surface2);
  color: var(--text);
}

.nav-item.active {
  background: var(--blue-bg);
  color: var(--blue);
  border: 1px solid var(--blue-border);
}

.nav-item svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.nav-badge {
  margin-left: auto;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 20px;
  background: var(--red-bg);
  color: var(--red);
  border: 1px solid rgba(248, 113, 113, 0.15);
}

.car-section {
  padding: 8px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.car-label {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--dim);
  padding: 8px 12px 6px;
  text-transform: uppercase;
}

.car-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 13px;
  color: var(--muted);
  transition: all 0.15s;
  margin-bottom: 1px;
}

.car-item:hover {
  background: var(--surface2);
  color: var(--text);
}

.car-item.active {
  color: var(--text);
  background: var(--surface2);
}

.car-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.car-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.car-urgent {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 20px;
  background: var(--red-bg);
  color: var(--red);
  border: 1px solid rgba(248, 113, 113, 0.15);
}

.add-car {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  color: var(--dim);
  border: 1px dashed var(--border2);
  margin: 4px 4px 8px;
  transition: all 0.15s;
}

.add-car:hover {
  border-color: var(--blue-border);
  color: var(--blue);
}

.logout {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin: 0 4px 4px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.15s;
}

.logout:hover {
  background: var(--surface2);
  border-color: var(--border2);
}

.logout > svg {
  color: var(--dim);
  margin-left: auto;
  flex-shrink: 0;
}

.logout-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--blue-bg);
  border: 1px solid var(--blue-border);
  color: var(--blue);
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: var(--font-display);
}

.logout-info {
  flex: 1;
  min-width: 0;
}

.logout-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-email {
  font-size: 10px;
  color: var(--dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>