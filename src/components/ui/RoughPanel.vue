<script setup lang="ts">
import RoughCanvas from './helpers/RoughCanvas.vue'

defineProps<{
  fill?: string
  noPadding?: boolean
}>()
</script>

<template>
  <div class="relative flex flex-col" :class="{ 'p-4': !noPadding }">
    <RoughCanvas :fill="fill ?? '#ffffff'" :roughness="1" />
    <slot />
  </div>
</template>
