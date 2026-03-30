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
    :class="active ? 'text-orange-600' : 'text-slate-700'"
  >
    <RoughCanvas
      :stroke="active ? '#fb923c' : '#475569'"
      :fill="active ? '#fff7ed' : 'transparent'"
      :roughness="active ? 2 : 1.2"
    />

    <div class="relative z-10 flex items-center gap-1">
      <img v-if="icon" :src="icon" class="h-6 w-6 object-contain opacity-80" />
      <span class="translate-y-0.5 transform px-2 text-2xl leading-none">
        <slot />
      </span>
    </div>
  </button>
</template>
