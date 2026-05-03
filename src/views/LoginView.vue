<script setup lang="ts">
import {useRouter} from "vue-router";
import {useAuthStore} from "../stores/auth.ts";
import {ref} from "vue";

const features = [
  {text: 'Несколько автомобилей в одном месте'},
  {text: 'Напоминания по пробегу и дате'},
  {text: 'История всех замен и ТО'},
  {text: 'Синхронизация между устройствами'},
]

const router = useRouter()
const auth = useAuthStore()

const email = ref('user@example.com')
const password = ref('VeryStrongPassword1!')
const remember = ref(false)
const showPassword = ref(false)
const focusedField = ref(null)

async function handleLogin() {
  auth.clearError()
  const ok = await auth.signIn({
    email: email.value,
    password: password.value
  })
  if (ok) await router.push('/overview')
}
</script>

<template>
  <div class="auth-layout">
    <div class="auth-left">
      <div class="brand">
        <div class="brand-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke-width="1.5">
            <rect x="2" y="8" width="16" height="10" rx="2"/>
            <path d="M5 8V6a5 5 0 0 1 10 0v2"/>
            <circle cx="10" cy="13" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </div>
        <span class="brand-name">Гараж</span>
      </div>

      <div class="tagline">
        <h1>Держи авто<br/>под контролем</h1>
        <p>Трекер технического обслуживания для всех ваших автомобилей. Никаких пропущенных замен масла.</p>
      </div>

      <div class="features">
        <div class="feature" v-for="f in features" :key="f.text">
          <div class="feature-dot"/>
          <span>{{ f.text }}</span>
        </div>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Вход в аккаунт</h2>
          <p>Добро пожаловать обратно</p>
        </div>

        <form class="auth-form" @submit.prevent="handleLogin">
          <div class="field">
            <label>Email</label>
            <div class="input-wrap" :class="{ focused: focusedField === 'email', error: !!auth.error }">
              <svg class="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="4" width="16" height="12" rx="2"/>
                <path d="M2 7l8 5 8-5"/>
              </svg>
              <input
                  type="email"
                  v-model="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  @focus="focusedField = 'email'"
                  @blur="focusedField = null"
                  required
              />
            </div>
          </div>

          <div class="field">
            <label>
              Пароль
              <RouterLink to="/forgot" class="label-link">Забыли?</RouterLink>
            </label>
            <div class="input-wrap" :class="{ focused: focusedField === 'password', error: !!auth.error }">
              <svg class="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="4" y="8" width="12" height="10" rx="2"/>
                <path d="M7 8V6a3 3 0 0 1 6 0v2"/>
                <circle cx="10" cy="13" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Ваш пароль"
                  autocomplete="current-password"
                  @focus="focusedField = 'password'"
                  @blur="focusedField = null"
                  required
              />
              <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/>
                  <circle cx="10" cy="10" r="2.5"/>
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                      d="M3 3l14 14M10 4c5.5 0 9 6 9 6s-1.2 2-3.5 4M6.5 6.5C4.2 8 3 10 3 10s3.5 6 7 6a7 7 0 0 0 3-.7"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="error-msg" v-if="auth.error">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="10" cy="10" r="8"/>
              <path d="M10 6v4"/>
              <circle cx="10" cy="14" r="0.5" fill="currentColor"/>
            </svg>
            {{ auth.error }}
          </div>

          <div class="remember-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="remember"/>
              <span class="checkbox-box"/>
              Запомнить меня
            </label>
          </div>

          <button class="submit-btn" type="submit" :disabled="auth.status === 'loading'">
            <span v-if="auth.status != 'loading'">Войти</span>
            <span v-else class="spinner"/>
          </button>
        </form>

        <div class="divider"><span>или</span></div>

        <div class="auth-footer">
          Нет аккаунта?
          <RouterLink to="/register" class="link">Зарегистрироваться</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* LEFT PANEL */
.auth-left {
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 36px;
  height: 36px;
  background: var(--blue-bg);
  border: 1px solid var(--blue-border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-icon svg {
  width: 18px;
  height: 18px;
  stroke: var(--blue);
}

.brand-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.tagline {
  margin-top: auto;
}

.tagline h1 {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.tagline p {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.6;
  max-width: 340px;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: auto;
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--muted);
}

.feature-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue);
  flex-shrink: 0;
}

/* RIGHT PANEL */
.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: var(--bg);
}

.auth-card {
  width: 100%;
  max-width: 380px;
}

.auth-header {
  margin-bottom: 32px;
}

.auth-header h2 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.auth-header p {
  font-size: 14px;
  color: var(--muted);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label-link {
  font-size: 11px;
  color: var(--blue);
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0;
}

.label-link:hover {
  text-decoration: underline;
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: var(--radius-sm);
  padding: 0 12px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.input-wrap.focused {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
}

.input-wrap.error {
  border-color: var(--red);
}

.input-icon {
  width: 15px;
  height: 15px;
  color: var(--dim);
  flex-shrink: 0;
}

.input-wrap input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 14px;
  padding: 11px 0;
  outline: none;
}

.input-wrap input::placeholder {
  color: var(--dim);
}

.toggle-pw {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--dim);
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.15s;
}

.toggle-pw:hover {
  color: var(--muted);
}

.toggle-pw svg {
  width: 15px;
  height: 15px;
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--red-bg);
  border: 1px solid rgba(248, 113, 113, 0.2);
  color: var(--red);
  font-size: 13px;
}

.error-msg svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.remember-row {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
  user-select: none;
}

.checkbox-label input {
  display: none;
}

.checkbox-box {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border2);
  border-radius: 4px;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
}

.checkbox-label input:checked + .checkbox-box {
  background: var(--blue);
  border-color: var(--blue);
}

.checkbox-label input:checked + .checkbox-box::after {
  content: '';
  width: 4px;
  height: 7px;
  border: 1.5px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translateY(-1px);
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--blue);
  border: none;
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
}

.submit-btn:hover:not(:disabled) {
  background: #3a8ef0;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: var(--dim);
  font-size: 12px;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.auth-footer {
  text-align: center;
  font-size: 13px;
  color: var(--muted);
}

.link {
  color: var(--blue);
  text-decoration: none;
  margin-left: 4px;
}

.link:hover {
  text-decoration: underline;
}
</style>