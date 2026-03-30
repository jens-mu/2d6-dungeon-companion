<script setup lang="ts">
import RoughCanvas from '../components/ui/helpers/RoughCanvas.vue'
</script>

<template>
  <header class="relative flex h-20 items-center justify-between bg-white px-6">
    <RoughCanvas :roughness="1.2" :padding="0" />

    <div class="z-10 flex items-center gap-4">
      <img src="/2d6_dungeon_logo.svg" alt="2D6 Dungeon" class="h-12 w-auto" />
      <span class="font-sketch pt-2 text-4xl text-slate-800">Companion</span>
    </div>

    <div class="z-10 flex gap-4"></div>
  </header>
</template>
