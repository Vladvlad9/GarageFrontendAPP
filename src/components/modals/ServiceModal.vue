<script setup lang="ts">
import {ref, watch} from "vue";
import {useModalStorage} from "../../stores/modal.ts";
import {useCarsStorage} from "../../stores/cars.ts";

const modal = useModalStorage()
const car = useCarsStorage()

const mileage = ref(0)
const date = ref('')

watch(() => modal.isOpen('service'), (open) => {
  if (open) {
    // selectedServiceId.value = car.selectedCar?.serviceItems[0]?.id ?? null
    mileage.value = car.selectedCar?.mileage ?? 0
    date.value = new Date().toISOString().slice(0, 10)
  }
})

function confirm() {
  // if (!selectedServiceId.value) return
  // store.markService(store.activeCarId, selectedServiceId.value, mileage.value, date.value)
  modal.close()
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" :class="{ open: modal.isOpen('service') }" @click.self="modal.close()">
      <div class="modal">
        <div class="modal-title">Отметить ТО — {{ car.selectedCar?.name }}</div>
        <div class="field">
          <label>Пункт ТО</label>
          <select v-model="car.selectedCar?.id">
            <option v-for="s in car.selectedCar?.serviceItems" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div class="field">
          <label>Пробег при замене, км</label>
          <input type="number" v-model.number="mileage"/>
        </div>
        <div class="field">
          <label>Дата</label>
          <input type="date" v-model="date"/>
        </div>
        <div class="modal-actions">
          <button class="btn" @click="modal.close()">Отмена</button>
          <button class="btn btn-primary" @click="confirm()">Сохранить</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  align-items: center;
  justify-content: center;
}

.modal-overlay.open {
  display: flex;
}

.modal {
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  padding: 24px;
  width: 360px;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 18px;
}

.field {
  margin-bottom: 14px;
}

.field label {
  display: block;
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.field input, .field select {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text);
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}

.field input:focus, .field select:focus {
  border-color: var(--blue);
}

.modal-actions {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.btn {
  flex: 1;
  padding: 9px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border2);
  background: transparent;
  color: var(--muted);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn:hover {
  background: var(--surface2);
  color: var(--text);
}

.btn-primary {
  background: var(--blue-bg);
  border-color: var(--blue-border);
  color: var(--blue);
}

.btn-primary:hover {
  background: rgba(74, 158, 255, 0.15);
}
</style>