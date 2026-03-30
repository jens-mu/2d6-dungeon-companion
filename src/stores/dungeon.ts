import { defineStore } from 'pinia'

// --- INTERFACES ---

export interface Room {
  id: string
  x: number // Grid-Coordinate
  y: number // Grid-Coordinate
  width: number // In Cells
  height: number // In Cells
  label: string
  note?: string
}

export interface Entity {
  id: string
  type: 'entrance' | 'exit' | 'door' | 'trap' | 'chest'
  x: number
  y: number
  icon: string
}

export interface Path {
  id: string
  points: { x: number; y: number }[] // List of grid points
}

export interface DungeonLevel {
  id: string
  name: string
  width: number
  height: number
  rooms: Room[]
  paths: Path[]
  entities: Entity[]
}

// --- STORE ---

export const useDungeonStore = defineStore('dungeon', {
  state: () => ({
    levels: [] as DungeonLevel[],
    currentLevelIndex: 0,
    gridSize: 40,
    isInitialized: false,
    currentMode: 'pan' as 'pan' | 'room' | 'path',
    selectedElementId: null as string | null,
    currentZoom: 1,
  }),

  getters: {
    // Current active level object
    currentLevel: (state): DungeonLevel | null => {
      if (state.levels.length === 0) return null
      return state.levels[state.currentLevelIndex]
    },

    // Find currently selected room for the sidebar
    selectedRoom: (state): Room | null => {
      const level = state.levels[state.currentLevelIndex]
      if (!level) return null
      return level.rooms.find((r) => r.id === state.selectedElementId) || null
    },
  },

  actions: {
    // Initialize a new level with a starting entrance
    addNewLevel(width: number, height: number) {
      const levelId = crypto.randomUUID()
      const newLevel: DungeonLevel = {
        id: levelId,
        name: `Level ${this.levels.length + 1}`,
        width: Math.max(5, width),
        height: Math.max(5, height),
        rooms: [],
        paths: [],
        entities: [
          {
            id: 'start-' + Date.now(),
            type: 'entrance',
            x: Math.floor(width / 2),
            y: 0, // Placed at the top edge by default
            icon: '🪜',
          },
        ],
      }

      this.levels.push(newLevel)
      this.currentLevelIndex = this.levels.length - 1
      this.isInitialized = true
    },

    // Add a room only if it's within level bounds
    addRoomToCurrentLevel(room: Room) {
      const level = this.currentLevel
      if (!level) return

      // Basic Boundary Check (Safety Net)
      const isOutOfBounds =
        room.x < 0 ||
        room.y < 0 ||
        room.x + room.width > level.width ||
        room.y + room.height > level.height

      if (isOutOfBounds) {
        console.warn('Room is out of level boundaries!')
        return
      }

      level.rooms.push(room)
      this.selectedElementId = room.id // Auto-select new room
    },

    // Set interaction mode
    setMode(mode: 'pan' | 'room' | 'path') {
      this.currentMode = mode
    },

    // UI Selection
    selectElement(id: string | null) {
      this.selectedElementId = id
    },

    // Helper: Check if a cell is occupied or has a neighbor
    // (This will be the foundation for your connection-rule)
    isCellConnected(x: number, y: number): boolean {
      const level = this.currentLevel
      if (!level) return false

      // 1. Check if it touches an entity (Entrance/Exit)
      const touchesEntity = level.entities.some(
        (e) => (Math.abs(e.x - x) <= 1 && e.y === y) || (Math.abs(e.y - y) <= 1 && e.x === x),
      )
      if (touchesEntity) return true

      // 2. Check if it touches an existing room
      const touchesRoom = level.rooms.some((r) => {
        const isAdjacentX = x >= r.x - 1 && x <= r.x + r.width
        const isAdjacentY = y >= r.y - 1 && y <= r.y + r.height
        // Logic: Must be exactly 1 cell away from the border
        // (We will refine this in the next step!)
        return isAdjacentX && isAdjacentY
      })

      return touchesRoom
    },
  },
})
