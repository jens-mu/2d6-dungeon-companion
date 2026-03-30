<script setup lang="ts">
import RoughCanvas from './helpers/RoughCanvas.vue'

defineProps<{
  active?: boolean
  icon?: string // Pfad zum SVG Icon
}>()
</script>

<template>
  <button
    class="group relative flex items-center justify-center p-2 transition-transform active:scale-95"
    :class="active ? 'text-orange-600' : 'text-slate-600'"
  >
    <RoughCanvas
      :stroke="active ? '#fb923c' : '#475569'"
      :fill="active ? '#fff7ed' : 'transparent'"
      :roughness="active ? 2 : 1.2"
    />

    <div class="relative z-10 flex items-center gap-2">
      <img v-if="icon" :src="icon" class="h-6 w-6 object-contain" />
      <span class="px-2 font-medium"><slot /></span>
    </div>
  </button>
</template>
