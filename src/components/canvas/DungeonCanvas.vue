<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import Konva from 'konva'
import { useDungeonStore } from '../../stores/dungeon'
import { useUIStore } from '../../stores/ui'

const dungeonStore = useDungeonStore()
const uiStore = useUIStore()
const container = ref<HTMLDivElement | null>(null)

let stage: Konva.Stage
let backgroundLayer: Konva.Layer
let gridLayer: Konva.Layer
let roomLayer: Konva.Layer

const patternImage = ref<HTMLImageElement | null>(null)
const PADDING_FIELDS = 2 // Wie viele Felder über den Rand hinaus gezeichnet wird

const scaleBy = 1.1
const minScale = 0.1
const maxScale = 5

onMounted(() => {
  if (!container.value) return

  stage = new Konva.Stage({
    container: container.value,
    width: container.value.offsetWidth,
    height: container.value.offsetHeight,
    draggable: true,
  })

  backgroundLayer = new Konva.Layer({ id: 'bgLayer', listening: false })
  roomLayer = new Konva.Layer({ id: 'roomLayer', listening: false })
  gridLayer = new Konva.Layer({ id: 'gridLayer', listening: false })

  stage.add(backgroundLayer)
  stage.add(roomLayer)
  stage.add(gridLayer)

  const img = new Image()
  img.src = '/src/assets/hatching.svg' //
  img.onload = () => {
    patternImage.value = img
    renderLevel()
  }

  centerMap()
  renderLevel()

  stage.on('wheel', handleWheel)
  window.addEventListener('resize', handleResize)
})

const renderLevel = () => {
  if (!dungeonStore.currentLevel) return

  backgroundLayer.destroyChildren()
  gridLayer.destroyChildren()
  roomLayer.destroyChildren()

  const gridSize = dungeonStore.gridSize
  const levelW = dungeonStore.currentLevel.width * gridSize
  const levelH = dungeonStore.currentLevel.height * gridSize

  // Berechnung des Sichtbereichs (Spielfeld + 2 Felder Puffer)
  const offset = PADDING_FIELDS * gridSize
  const drawX = -offset
  const drawY = -offset
  const drawW = levelW + offset * 2
  const drawH = levelH + offset * 2

  // 1. Weisser Hintergrund (nur im erweiterten Spielbereich)
  backgroundLayer.add(
    new Konva.Rect({
      x: drawX,
      y: drawY,
      width: drawW,
      height: drawH,
      fill: '#ffffff',
      listening: false,
    }),
  )

  // 2. SVG MUSTER (1x1 Kachel-Modus)
  if (patternImage.value) {
    backgroundLayer.add(
      new Konva.Rect({
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH,
        fillPatternImage: patternImage.value,
        fillPatternRepeat: 'repeat',
        fillPatternScaleX: gridSize / patternImage.value.width,
        fillPatternScaleY: gridSize / patternImage.value.height,
        listening: false,
      }),
    )
  }

  // 3. ROTE GRID PUNKTE (Nur im erweiterten Spielbereich)
  // für die Farbwahl (Rot)
  for (let x = drawX; x <= drawW + drawX; x += gridSize) {
    for (let y = drawY; y <= drawH + drawY; y += gridSize) {
      gridLayer.add(
        new Konva.Circle({
          x,
          y,
          radius: 1,
          fill: '#ff0000',
          opacity: 0.5,
          listening: false,
        }),
      )
    }
  }

  // 4. BESTEHENDE RÄUME
  dungeonStore.currentLevel.rooms.forEach((room) => {
    roomLayer.add(
      new Konva.Rect({
        x: room.x * gridSize,
        y: room.y * gridSize,
        width: room.width * gridSize,
        height: room.height * gridSize,
        fill: 'rgba(255, 255, 255, 0.9)',
        stroke: '#1e293b',
        strokeWidth: 2,
      }),
    )
  })

  backgroundLayer.batchDraw()
  roomLayer.batchDraw()
  gridLayer.batchDraw()
}

// --- STANDARD HANDLERS ---
const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
  e.evt.preventDefault()
  const oldScale = stage.scaleX()
  const pointer = stage.getPointerPosition()
  if (!pointer) return

  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  }

  const direction = e.evt.deltaY > 0 ? 0.9 : 1.1
  let newScale = Math.max(minScale, Math.min(maxScale, oldScale * direction))

  stage.scale({ x: newScale, y: newScale })
  stage.position({
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  })
  uiStore.currentZoom = newScale
}

const centerMap = () => {
  if (!dungeonStore.currentLevel) return
  const levelW = dungeonStore.currentLevel.width * dungeonStore.gridSize
  const levelH = dungeonStore.currentLevel.height * dungeonStore.gridSize
  stage.x(stage.width() / 2 - (levelW * stage.scaleX()) / 2)
  stage.y(stage.height() / 2 - (levelH * stage.scaleY()) / 2)
}

function handleResize() {
  if (!container.value) return
  stage.width(container.value.offsetWidth)
  stage.height(container.value.offsetHeight)
  renderLevel()
}

watch(
  () => uiStore.currentZoom,
  (val) => {
    if (Math.abs(stage.scaleX() - val) > 0.01) {
      stage.scale({ x: val, y: val })
      stage.batchDraw()
    }
  },
)

watch(
  () => dungeonStore.currentLevelIndex,
  () => {
    centerMap()
    renderLevel()
  },
)

onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<template>
  <div ref="container" class="h-full w-full bg-slate-950 outline-none"></div>
</template>
