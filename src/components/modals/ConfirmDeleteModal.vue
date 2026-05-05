<script setup lang="ts">
import {computed} from "vue";
import {useCarsStorage} from "../../stores/cars.ts";
import {useModalStorage} from "../../stores/modal.ts";

const car = useCarsStorage()
const modal = useModalStorage()

const targetCar = computed(() => {
  if (!modal.payload) return null
  return car.items.find((item) => item.id === modal.payload) ?? null
})

async function confirmDelete() {
  if (!modal.payload) return

  await car._deleteCar(modal.payload)
  modal.close()
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" :class="{ open: modal.isOpen('confirmDelete') }" @click.self="modal.close()">
      <div class="modal">
        <div class="modal-title">Удалить автомобиль?</div>
        <p class="modal-text">
          <template v-if="targetCar">
            Автомобиль <strong>{{ targetCar.name }}</strong> будет удалён без возможности восстановления.
          </template>
          <template v-else>
            Автомобиль будет удалён без возможности восстановления.
          </template>
        </p>
        <div class="modal-actions">
          <button class="btn" @click="modal.close()">Отмена</button>
          <button class="btn btn-danger" @click="confirmDelete()">Удалить</button>
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
  width: min(420px, calc(100vw - 32px));
}

.modal-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.modal-text {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 8px;
  margin-top: 22px;
}

.btn {
  flex: 1;
  padding: 10px 12px;
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

.btn-danger {
  background: var(--red-bg);
  border-color: rgba(248, 113, 113, 0.2);
  color: var(--red);
}

.btn-danger:hover {
  background: rgba(248, 113, 113, 0.14);
}
</style>
