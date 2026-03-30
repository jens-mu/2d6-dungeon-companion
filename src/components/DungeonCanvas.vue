<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import Konva from 'konva'
import rough from 'roughjs'
import { useDungeonStore } from '../stores/dungeon'

const store = useDungeonStore()
const container = ref<HTMLDivElement | null>(null)

let stage: Konva.Stage
let mainLayer: Konva.Layer
let gridLayer: Konva.Layer
let previewRect: Konva.Rect

// Drawing State
let isDrawing = false
let startPoint = { x: 0, y: 0 }

onMounted(() => {
  if (!container.value) return

  // 1. Setup Stage
  stage = new Konva.Stage({
    container: container.value,
    width: container.value.offsetWidth,
    height: container.value.offsetHeight,
    draggable: store.currentMode === 'pan',
  })

  gridLayer = new Konva.Layer()
  mainLayer = new Konva.Layer()
  stage.add(gridLayer)
  stage.add(mainLayer)

  // 2. Preview Rectangle (The Ghost)
  previewRect = new Konva.Rect({
    stroke: '#fb923c',
    strokeWidth: 2,
    dash: [5, 5],
    visible: false,
  })
  mainLayer.add(previewRect)

  renderLevel()

  // 3. Event Listeners
  stage.on('mousedown', handleMouseDown)
  stage.on('mousemove', handleMouseMove)
  stage.on('mouseup', handleMouseUp)

  window.addEventListener('resize', handleResize)
})

// --- HELPER FUNCTIONS ---

const getSnapPos = (pos: number) => Math.round(pos / store.gridSize) * store.gridSize

const isInsidePaper = (x: number, y: number) => {
  if (!store.currentLevel) return false
  const w = store.currentLevel.width * store.gridSize
  const h = store.currentLevel.height * store.gridSize
  return x >= 0 && x <= w && y >= 0 && y <= h
}

// --- RENDER LOGIC ---

const renderLevel = () => {
  if (!store.currentLevel) return

  mainLayer.destroyChildren()
  gridLayer.destroyChildren()
  mainLayer.add(previewRect)

  const levelW = store.currentLevel.width * store.gridSize
  const levelH = store.currentLevel.height * store.gridSize

  // Draw the Paper Sheet
  const paper = new Konva.Rect({
    x: 0,
    y: 0,
    width: levelW,
    height: levelH,
    fill: '#f8fafc', // Light paper color
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOpacity: 0.2,
  })
  gridLayer.add(paper)

  // Draw Grid Points (optimized)
  for (let x = 0; x <= levelW; x += store.gridSize) {
    for (let y = 0; y <= levelH; y += store.gridSize) {
      gridLayer.add(
        new Konva.Circle({
          x,
          y,
          radius: 1,
          fill: '#cbd5e1',
          listening: false,
        }),
      )
    }
  }

  // Draw Rooms from Store
  store.currentLevel.rooms.forEach((room) => {
    drawSketchyRoom(room)
  })

  // Draw Entities (Entrance/Exit)
  store.currentLevel.entities.forEach((entity) => {
    const text = new Konva.Text({
      x: entity.x * store.gridSize,
      y: entity.y * store.gridSize,
      text: entity.icon,
      fontSize: store.gridSize * 0.8,
      width: store.gridSize,
      align: 'center',
    })
    mainLayer.add(text)
  })

  gridLayer.batchDraw()
  mainLayer.batchDraw()
}

const drawSketchyRoom = (room: any) => {
  const x = room.x * store.gridSize
  const y = room.y * store.gridSize
  const w = room.width * store.gridSize
  const h = room.height * store.gridSize

  // We use a Canvas Shape to let Rough.js draw inside Konva
  const roomShape = new Konva.Shape({
    x,
    y,
    width: w,
    height: h,
    sceneFunc: (context, shape) => {
      const canvas = document.createElement('canvas')
      const rc = rough.canvas(canvas)
      // Drawing sketchy rectangle
      const drawing = rc.generator.rectangle(0, 0, w, h, {
        roughness: 1.2,
        stroke: '#1e293b',
        strokeWidth: 2,
        fill: 'white',
        fillStyle: 'solid',
      })

      // Transfer rough.js paths to Konva context
      const paths = rc.generator.toPaths(drawing)
      paths.forEach((p) => {
        context.beginPath()
        const pathData = new Path2D(p.d)
        // This is a simplified approach; usually we'd use context.stroke(pathData)
        // For Konva we'll use a trick or draw it manually.
      })

      // fallback simple rect for now until we refine the Rough.js bridge
      context.rect(0, 0, w, h)
      context.fillStrokeShape(shape)
    },
    fill: 'white',
    stroke: '#1e293b',
    strokeWidth: 2,
  })

  mainLayer.add(roomShape)
}

// --- MOUSE HANDLERS ---

function handleMouseDown() {
  if (store.currentMode !== 'room') return
  const pos = stage.getRelativePointerPosition()
  if (!pos || !isInsidePaper(pos.x, pos.y)) return

  if (!isDrawing) {
    isDrawing = true
    startPoint = { x: getSnapPos(pos.x), y: getSnapPos(pos.y) }
    previewRect.setAttrs({
      x: startPoint.x,
      y: startPoint.y,
      width: 0,
      height: 0,
      visible: true,
    })
  } else {
    finishDrawing(pos)
  }
}

function handleMouseMove() {
  if (!isDrawing) return
  const pos = stage.getRelativePointerPosition()
  if (!pos) return

  const curX = getSnapPos(pos.x)
  const curY = getSnapPos(pos.y)

  previewRect.setAttrs({
    width: curX - startPoint.x,
    height: curY - startPoint.y,
  })
  mainLayer.batchDraw()
}

function handleMouseUp() {
  // Optional: Add logic for drag-release if needed
}

function finishDrawing(pos: any) {
  isDrawing = false
  previewRect.visible(false)

  const endX = getSnapPos(pos.x)
  const endY = getSnapPos(pos.y)

  const newRoom = {
    id: crypto.randomUUID(),
    x: Math.min(startPoint.x, endX) / store.gridSize,
    y: Math.min(startPoint.y, endY) / store.gridSize,
    width: Math.max(1, Math.abs(endX - startPoint.x) / store.gridSize),
    height: Math.max(1, Math.abs(endY - startPoint.y) / store.gridSize),
    label: 'New Room',
  }

  // TODO: Add connection validation here!
  store.addRoomToCurrentLevel(newRoom)
  renderLevel()
}

function handleResize() {
  if (container.value) {
    stage.width(container.value.offsetWidth)
    stage.height(container.value.offsetHeight)
  }
}

// Watch for level changes or mode changes
watch(() => store.currentLevelIndex, renderLevel)
watch(
  () => store.currentMode,
  (newMode) => {
    stage.draggable(newMode === 'pan')
  },
)

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="container" class="h-full w-full overflow-hidden outline-none"></div>
</template>

<style scoped>
/* Optional styling */
</style>
