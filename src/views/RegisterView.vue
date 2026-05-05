<script setup lang="ts">
import {useRouter} from "vue-router";
import {useAuthStore} from "../stores/auth.ts";
import {computed, ref} from "vue";
import type {SignUpRequest} from "../types/auth.ts";

const router = useRouter()
const auth = useAuthStore()

const steps = [
  {name: 'Добавь авто', desc: 'Укажи марку, год и пробег'},
  {name: 'Настрой регламенты', desc: 'Выбери интервалы замен'},
  {name: 'Получай напоминания', desc: 'Не пропускай важные ТО'},
]

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const agreed = ref(false)
const showPassword = ref(false)
const focusedField = ref<'name' | 'email' | 'password' | 'confirm' | null>(null)
const errors = ref<Partial<Record<keyof SignUpRequest, string>>>({})


function fieldError(field: keyof SignUpRequest) {
  return errors.value[field] || null
}

function validateName() {
  if (!name.value) errors.value.name = 'Введите имя'
  else delete errors.value.name
}

function validateEmail() {
  if (!email.value.includes('@')) errors.value.email = 'Введите корректный email'
  else delete errors.value.email
}

function validatePassword() {
  if (password.value.length < 8) errors.value.password = 'Минимум 8 символов'
  else delete errors.value.password
}

function validateConfirm() {
  if (confirm.value !== password.value) errors.value.confirm = 'Пароли не совпадают'
  else delete errors.value.confirm
}

const strength = computed(() => {
  const p = password.value
  let score = 0
  if (p.length >= 8) score++
  if (p.length >= 12) score++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++
  if (/[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) score++
  const labels = ['', 'Слабый', 'Средний', 'Хороший', 'Отличный']
  const colors = ['', 'red', 'amber', 'blue', 'green']
  return {score, label: labels[score] || 'Слабый', color: colors[score] || 'red'}
})

function updateStrength() {
}

async function handleRegister() {
  validateName();
  validateEmail();
  validatePassword();
  validateConfirm()
  if (Object.keys(errors.value).length > 0) return
  auth.clearError()

  const ok = await auth.signUp({
    name: name.value,
    email: email.value,
    password: password.value,
    confirm: confirm.value,
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

      <div class="steps">
        <div class="steps-title">Как это работает</div>
        <div class="step" v-for="(s, i) in steps" :key="i">
          <div class="step-num">{{ i + 1 }}</div>
          <div>
            <div class="step-name">{{ s.name }}</div>
            <div class="step-desc">{{ s.desc }}</div>
          </div>
        </div>
      </div>

      <div class="promo">
        <div class="promo-num">3</div>
        <div class="promo-text">автомобиля<br/>бесплатно</div>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Создать аккаунт</h2>
          <p>Бесплатно, без карты</p>
        </div>

        <form class="auth-form" @submit.prevent="handleRegister">

          <div class="field">
            <label>Ваше имя</label>
            <div class="input-wrap" :class="{ focused: focusedField === 'name', error: fieldError('name') }">
              <svg class="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="10" cy="7" r="3.5"/>
                <path d="M2 18c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <input
                  type="text"
                  v-model="name"
                  placeholder="Иван Иванов"
                  autocomplete="name"
                  @focus="focusedField = 'name'"
                  @blur="focusedField = null; validateName()"
                  required
              />
            </div>
            <div class="field-error" v-if="fieldError('name')">{{ fieldError('name') }}</div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="input-wrap" :class="{ focused: focusedField === 'email', error: fieldError('email') }">
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
                  @blur="focusedField = null; validateEmail()"
                  required
              />
            </div>
            <div class="field-error" v-if="fieldError('email')">{{ fieldError('email') }}</div>
          </div>

          <div class="field">
            <label>Пароль</label>
            <div class="input-wrap" :class="{ focused: focusedField === 'password', error: fieldError('password') }">
              <svg class="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="4" y="8" width="12" height="10" rx="2"/>
                <path d="M7 8V6a3 3 0 0 1 6 0v2"/>
                <circle cx="10" cy="13" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Минимум 8 символов"
                  autocomplete="new-password"
                  @focus="focusedField = 'password'"
                  @blur="focusedField = null; validatePassword()"
                  @input="updateStrength"
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
            <!-- Password strength -->
            <div class="strength-bar" v-if="password.length > 0">
              <div
                  v-for="i in 4" :key="i"
                  class="strength-seg"
                  :class="{ active: i <= strength.score, [strength.color]: i <= strength.score }"
              />
            </div>
            <div class="strength-label" v-if="password.length > 0" :class="strength.color">
              {{ strength.label }}
            </div>
            <div class="field-error" v-if="fieldError('password')">{{ fieldError('password') }}</div>
          </div>

          <div class="field">
            <label>Подтвердите пароль</label>
            <div class="input-wrap" :class="{ focused: focusedField === 'confirm', error: fieldError('confirm') }">
              <svg class="input-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M5 10l4 4 6-7"/>
                <circle cx="10" cy="10" r="8"/>
              </svg>
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="confirm"
                  placeholder="Повторите пароль"
                  autocomplete="new-password"
                  @focus="focusedField = 'confirm'"
                  @blur="focusedField = null; validateConfirm()"
                  required
              />
              <div v-if="confirm.length > 0" class="match-icon">
                <svg v-if="confirm === password" viewBox="0 0 20 20" fill="none" stroke="#4ade80" stroke-width="2">
                  <path d="M4 10l5 5 7-7"/>
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="none" stroke="#f87171" stroke-width="2">
                  <path d="M5 5l10 10M15 5L5 15"/>
                </svg>
              </div>
            </div>
            <div class="field-error" v-if="fieldError('confirm')">{{ fieldError('confirm') }}</div>
          </div>

          <div class="error-msg" v-if="auth.error">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="10" cy="10" r="8"/>
              <path d="M10 6v4"/>
              <circle cx="10" cy="14" r="0.5" fill="currentColor"/>
            </svg>
            {{ auth.error }}
          </div>

          <label class="agree-label">
            <input type="checkbox" v-model="agreed" required/>
            <span class="checkbox-box"/>
            <span>Соглашаюсь с <a href="#" class="link">условиями использования</a></span>
          </label>

          <button class="submit-btn" type="submit" :disabled="auth.status === 'loading' || !agreed">
            <span v-if="auth.status != 'loading'">Создать аккаунт</span>
            <span v-else class="spinner"/>
          </button>
        </form>

        <div class="divider"><span>или</span></div>

        <div class="auth-footer">
          Уже есть аккаунт?
          <RouterLink to="/login" class="link">Войти</RouterLink>
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

.auth-left {
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 40px;
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

.steps-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--dim);
  margin-bottom: 20px;
}

.step {
  display: flex;
  gap: 14px;
  margin-bottom: 20px;
}

.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--blue-bg);
  border: 1px solid var(--blue-border);
  color: var(--blue);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: var(--font-display);
}

.step-name {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
}

.step-desc {
  font-size: 12px;
  color: var(--muted);
}

.promo {
  margin-top: auto;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.promo-num {
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  color: var(--blue);
  letter-spacing: -0.04em;
}

.promo-text {
  font-size: 18px;
  color: var(--muted);
  line-height: 1.3;
}

.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: var(--bg);
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.auth-header {
  margin-bottom: 28px;
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
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label {
  font-size: 11px;
  font-weight: 500;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

.match-icon {
  display: flex;
  align-items: center;
}

.match-icon svg {
  width: 14px;
  height: 14px;
}

.field-error {
  font-size: 11px;
  color: var(--red);
}

.strength-bar {
  display: flex;
  gap: 4px;
  margin-top: 6px;
}

.strength-seg {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: var(--border2);
  transition: background 0.2s;
}

.strength-seg.active.red {
  background: #f87171;
}

.strength-seg.active.amber {
  background: #fbbf24;
}

.strength-seg.active.blue {
  background: var(--blue);
}

.strength-seg.active.green {
  background: #4ade80;
}

.strength-label {
  font-size: 11px;
  margin-top: 4px;
}

.strength-label.red {
  color: #f87171;
}

.strength-label.amber {
  color: #fbbf24;
}

.strength-label.blue {
  color: var(--blue);
}

.strength-label.green {
  color: #4ade80;
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

.agree-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
  user-select: none;
  margin-top: 2px;
}

.agree-label input {
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

.agree-label input:checked + .checkbox-box {
  background: var(--blue);
  border-color: var(--blue);
}

.agree-label input:checked + .checkbox-box::after {
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
  opacity: 0.5;
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
  margin: 20px 0;
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
  margin-left: 2px;
}

.link:hover {
  text-decoration: underline;
}
</style>
