<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import rough from 'roughjs'

const props = defineProps<{
  roughness?: number
  stroke?: string
  fill?: string
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch'
  fillWeight?: number
  seed?: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let resizeObserver: ResizeObserver | null = null

const draw = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const rc = rough.canvas(canvas)

  // Auflösung anpassen (Retina-Support)
  const dpr = window.devicePixelRatio || 1
  canvas.width = canvas.offsetWidth * dpr
  canvas.height = canvas.offsetHeight * dpr

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  rc.rectangle(2, 2, canvas.offsetWidth - 4, canvas.offsetHeight - 4, {
    roughness: props.roughness ?? 1.5,
    stroke: props.stroke ?? '#475569',
    strokeWidth: 1.5,
    fill: props.fill,
    fillStyle: props.fillStyle ?? 'hachure',
    fillWeight: props.fillWeight ?? 0.5,
    seed: props.seed ?? Math.floor(Math.random() * 1000),
  })
}

onMounted(() => {
  draw()
  // Re-draw wenn sich die Größe des Containers ändert
  resizeObserver = new ResizeObserver(draw)
  if (canvasRef.value) resizeObserver.observe(canvasRef.value)
})

onUnmounted(() => resizeObserver?.disconnect())
watch(() => [props.fill, props.stroke, props.roughness], draw)
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 -z-10 h-full w-full"></canvas>
</template>
