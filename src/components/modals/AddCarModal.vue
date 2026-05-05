<script setup lang="ts">
import {ref} from "vue";
import {useCarsStorage} from "../../stores/cars.ts";
import {useModalStorage} from "../../stores/modal.ts";

const car = useCarsStorage()
const modal = useModalStorage()

const brand = ref('')
const model = ref('')
const year = ref(0)
const mileage = ref(0)

function confirm() {
  if (!brand.value && !model.value) return

  car.createCar()
  modal.close()
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" :class="{ open: modal.isOpen('addCar') }" @click.self="modal.close()">
      <div class="modal">
        <div class="modal-title">Добавить автомобиль</div>
        <!-- <div class="field">
          <label>Марка и модель</label>
          <input type="text" v-model="name" placeholder="например, BMW 3 Series" />
        </div> -->
        <div class="field">
          <label>Марка</label>
          <input type="text" v-model="brand" placeholder="например, BMW"/>
        </div>
        <div class="field">
          <label>Модель</label>
          <input type="text" v-model="model" placeholder="например, 3 Series"/>
        </div>
        <div class="field">
          <label>Год выпуска</label>
          <input type="number" v-model.number="year" placeholder="2018"/>
        </div>
        <div class="field">
          <label>Текущий пробег, км</label>
          <input type="number" v-model.number="mileage" placeholder="95 000"/>
        </div>
        <div class="modal-actions">
          <button class="btn" @click="modal.close()">Отмена</button>
          <button class="btn btn-primary" @click="confirm()">Добавить</button>
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

.field input {
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

.field input:focus {
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
</style>
