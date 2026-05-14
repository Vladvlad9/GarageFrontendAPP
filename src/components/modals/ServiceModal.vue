<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {useModalStorage} from "../../stores/modal.ts";
import {useCarsStorage} from "../../stores/cars.ts";
import {useItemNameStorage} from "../../stores/items_name.ts";
import {useServiceItemStorage} from "../../stores/serviceItem.ts";
import type {ServiceItemCreateDTO} from "../../types/serviceItem.ts";

const modal = useModalStorage()
const car = useCarsStorage()
const itemName = useItemNameStorage()
const serviceItem = useServiceItemStorage()

const mileage = ref(0)
const date = ref('')
const other = ref(false)
const selectedItemId = ref('')
const customItemName = ref('')

watch(() => modal.isOpen('service'), (open) => {
  if (open) {
    // selectedServiceId.value = car.selectedCar?.serviceItems[0]?.id ?? null
    mileage.value = car.selectedCar?.mileage ?? 0
    date.value = new Date().toISOString().slice(0, 10)
    other.value = false
    selectedItemId.value = itemName.items[0]?.id ?? ''
    customItemName.value = ''
  }
})



function confirm() {
  // if (!selectedServiceId.value) return
  // store.markService(store.activeCarId, selectedServiceId.value, mileage.value, date.value)

  const form = reactive<ServiceItemCreateDTO>({
    carId: car.selectedCar?.id,
    serviceItemNameId: selectedItemId.value,
    lastKm: mileage.value,
    lastDate: date.value,
  });

  serviceItem.createServiceItem(form)
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
          <select v-if="!other" v-model="selectedItemId">
            <option v-for="item in itemName.items" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>

          <input
              v-else
              v-model="customItemName"
              type="text"
              placeholder="Например, свечи"
          />

          <div class="other-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="other"/>
              <span class="checkbox-box"/>
              Другое
              <span
                  class="help-tip"
                  tabindex="0"
                  data-tip="Выберите это, если нужного пункта нет в списке"
                  aria-label="Выберите это, если нужного пункта нет в списке"
              >?</span>
            </label>
          </div>

        </div>
        <div class="field">
          <label>Пробег при замене, км</label>
          <input type="number" v-model.number="mileage" placeholder="10000"/>
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

.field > label {
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

.other-row {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
  user-select: none;
  margin-bottom: 0;
  text-transform: none;
  letter-spacing: normal;
}

.help-tip {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--border2);
  background: var(--surface2);
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  position: relative;
  cursor: help;
}

.help-tip::after {
  content: attr(data-tip);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  transform: translateX(-50%);
  min-width: 220px;
  max-width: 260px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(10, 10, 12, 0.96);
  color: var(--text);
  font-size: 12px;
  line-height: 1.4;
  white-space: normal;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  z-index: 1;
}

.help-tip:hover::after,
.help-tip:focus-visible::after {
  opacity: 1;
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
</style>
