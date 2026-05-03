<script setup lang="ts">

</script>

<template>
  <div class="skeleton">
    <div class="sk-topbar">
      <div class="sk-left">
        <div class="sk circle"/>
        <div>
          <div class="sk" style="width:160px;height:14px;margin-bottom:6px;"/>
          <div class="sk" style="width:110px;height:10px;"/>
        </div>
      </div>
      <div class="sk-right">
        <div class="sk" style="width:130px;height:34px;border-radius:8px;"/>
        <div class="sk" style="width:110px;height:34px;border-radius:8px;"/>
      </div>
    </div>

    <div class="sk-tabs">
      <div class="sk" style="width:60px;height:12px;" v-for="i in 4" :key="i"/>
    </div>

    <div class="sk-content">
      <div class="sk-metrics">
        <div class="sk-metric" v-for="i in 3" :key="i">
          <div class="sk" style="width:70%;height:10px;margin-bottom:10px;"/>
          <div class="sk" style="width:40%;height:28px;margin-bottom:6px;"/>
          <div class="sk" style="width:50%;height:9px;"/>
        </div>
      </div>

      <div class="sk" style="width:120px;height:10px;margin-bottom:12px;"/>

      <div class="sk-cards">
        <div class="sk-card" v-for="i in 4" :key="i">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div class="sk" style="width:34px;height:34px;border-radius:8px;flex-shrink:0;"/>
            <div style="flex:1;">
              <div class="sk" style="height:12px;width:80%;margin-bottom:6px;"/>
              <div class="sk" style="height:9px;width:55%;"/>
            </div>
          </div>
          <div class="sk" style="height:3px;border-radius:2px;margin-bottom:10px;"/>
          <div style="display:flex;justify-content:space-between;">
            <div class="sk" style="height:9px;width:40%;"/>
            <div class="sk" style="height:18px;width:55px;border-radius:20px;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -600px 0
  }
  100% {
    background-position: 600px 0
  }
}

.sk {
  background: linear-gradient(90deg,
  var(--surface2) 25%,
  var(--surface) 50%,
  var(--surface2) 75%
  );
  background-size: 600px 100%;
  animation: shimmer 1.4s infinite;
  border-radius: var(--radius-sm);
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.sk-topbar {
  padding: 16px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sk-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.sk-right {
  display: flex;
  gap: 8px;
}

.sk-tabs {
  display: flex;
  gap: 24px;
  padding: 14px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.sk-content {
  padding: 24px 28px;
  overflow: hidden;
}

.sk-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.sk-metric {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
}

.sk-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.sk-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}
</style>