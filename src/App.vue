<script setup lang="ts">
import { RouterView } from 'vue-router'
import {useRoute} from "vue-router";
import {computed, onMounted, watch} from "vue";
import {useAuthStore} from "./stores/auth.ts";
import {useCarsStorage} from "./stores/cars.ts";
import AddCarModal from "./components/modals/AddCarModal.vue";
import MileageModal from "./components/modals/MileageModal.vue";
import ServiceModal from "./components/modals/ServiceModal.vue";
import TheSidebar from "./components/TheSidebar.vue";
import TheTopbar from "./components/TheTopbar.vue";
import TheTabs from "./components/TheTabs.vue";
import AppSkeleton from "./components/AppSkeleton.vue";

const route = useRoute()
const auth = useAuthStore()
const car = useCarsStorage()
const isAuthPage = computed(() => ['/login', '/register'].includes(route.path))

async function syncCars(force = false) {
  if (isAuthPage.value) return
  if (!auth.accessToken) return
  if (car.status === 'loading') return
  // if (!force && car.items.length > 0 && car.currentCar && car.currentServices.length > 0) return

  await car.getCars()
}

onMounted(async () => {
  await auth.restore()
  await syncCars()
})

watch([() => route.path, () => auth.accessToken], async () => {
  if (!auth.accessToken) {
    car.clearCars()
    return
  }

  await syncCars(true)
})

</script>

<template>
  <RouterView v-if="isAuthPage"/>

  <template v-else>
    <div id="layout">
      <TheSidebar/>
      <div class="main">
        <template v-if="auth.status === 'loading'">
          <AppSkeleton/>
        </template>
        <template v-else>
          <TheTopbar/>
          <TheTabs/>
          <div class="content">
            <Transition name="fade" mode="out-in">
              <RouterView/>
            </Transition>
          </div>
        </template>
      </div>
    </div>
    <ServiceModal/>
    <MileageModal/>
    <AddCarModal/>
  </template>
</template>

<style>
#layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
}
</style>
