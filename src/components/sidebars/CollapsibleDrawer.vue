<script setup lang="ts">
interface Props {
  isOpen: boolean
  side: 'left' | 'right'
}

const props = defineProps<Props>()
defineEmits(['toggle'])
</script>

<template>
  <div
    class="relative h-full overflow-hidden border-slate-700 bg-white transition-all duration-[500ms] ease-linear"
    :style="{ width: isOpen ? '256px' : '48px' }"
    :class="[side === 'left' ? 'border-r' : 'border-l']"
  >
    <button
      @click="$emit('toggle')"
      class="absolute top-2 z-50 flex h-20 w-20 items-center justify-center rounded text-slate-900 transition-colors hover:bg-slate-200"
      :class="side === 'left' ? 'right-2' : 'left-2'"
    >
      <i class="fa-solid fa-bars text-xl"></i>
    </button>

    <div
      class="h-full w-[256px] p-4 text-slate-900 transition-all duration-[500ms] ease-linear"
      :class="isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
    >
      <slot></slot>
    </div>
  </div>
</template>
