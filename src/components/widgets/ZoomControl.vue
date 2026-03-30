<script setup lang="ts">
import { computed } from 'vue'
import { useDungeonStore } from '../../stores/dungeon'
const store = useDungeonStore()

const zoomPercent = computed(() => Math.round(store.currentZoom * 100))

const adjustZoom = (delta: number) => {
  const newZoom = Math.min(Math.max(store.currentZoom + delta, 0.5), 3)
  store.currentZoom = parseFloat(newZoom.toFixed(2))
}

const resetZoom = () => (store.currentZoom = 1.0)
</script>

<template>
  <div
    class="absolute right-6 bottom-6 z-[100] flex items-center gap-1 rounded-xl border border-slate-700/50 bg-slate-800/90 p-1.5 shadow-2xl backdrop-blur-md select-none"
  >
    <button
      @click="adjustZoom(-0.1)"
      class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-700"
    >
      <span class="text-xl font-light">−</span>
    </button>

    <button
      @click="resetZoom"
      class="min-w-[56px] px-2 py-1 text-center font-mono text-xs font-medium text-slate-200 transition-colors hover:text-orange-400"
      title="Reset auf 100%"
    >
      {{ zoomPercent }}%
    </button>

    <button
      @click="adjustZoom(0.1)"
      class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-700"
    >
      <span class="text-xl font-light">+</span>
    </button>
  </div>
</template>

<style scoped>
/* Optional: Ein kleiner Glow-Effekt bei Hover auf die Prozentanzeige */
button:hover span {
  filter: drop-shadow(0 0 2px rgba(251, 146, 60, 0.5));
}
</style>
