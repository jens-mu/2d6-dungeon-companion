<template>
  <div
    class="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50"
  >
    <div
      class="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl max-w-2xl w-full"
    >
      <h2 class="text-2xl font-bold text-orange-500 mb-6 text-center italic">
        - Prepare Your Parchment -
      </h2>

      <div class="grid grid-cols-3 gap-4 mb-8">
        <button
          v-for="size in presets"
          :key="size.label"
          @click="selectPreset(size.w, size.h)"
          class="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-orange-600/20 border border-transparent hover:border-orange-500 transition group"
        >
          <div
            class="bg-slate-600 w-16 h-20 mb-2 rounded shadow-inner group-hover:bg-slate-500 flex items-center justify-center text-[10px] text-slate-400"
          >
            {{ size.w }}x{{ size.h }}
          </div>
          <span class="font-bold">{{ size.label }}</span>
          <span class="text-xs text-slate-400"
            >{{ size.w }} x {{ size.h }} Cells</span
          >
        </button>
      </div>

      <div class="bg-slate-900 p-6 rounded-lg border border-slate-700">
        <h3 class="text-sm font-bold text-slate-500 uppercase mb-4">
          Custom Size
        </h3>
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="text-xs text-slate-500 block mb-1">Width</label>
            <input
              type="number"
              v-model="customW"
              class="w-full bg-slate-800 border border-slate-700 p-2 rounded text-orange-400 outline-none focus:border-orange-500"
            />
          </div>
          <span class="mt-5 text-slate-600">x</span>
          <div class="flex-1">
            <label class="text-xs text-slate-500 block mb-1">Height</label>
            <input
              type="number"
              v-model="customH"
              class="w-full bg-slate-800 border border-slate-700 p-2 rounded text-orange-400 outline-none focus:border-orange-500"
            />
          </div>
          <button
            @click="confirmStart(customW, customH)"
            class="mt-5 bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded font-bold transition"
          >
            Start Level
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const presets = [
  { label: 'Small', w: 20, h: 20 },
  { label: 'Standard', w: 30, h: 40 },
  { label: 'Deep Dungeon', w: 50, h: 60 }
]

const customW = ref(30)
const customH = ref(30)

const emit = defineEmits(['start'])

const selectPreset = (w: number, h: number) => {
  confirmStart(w, h)
}

const confirmStart = (w: number, h: number) => {
  emit('start', { width: w, height: h })
}
</script>
