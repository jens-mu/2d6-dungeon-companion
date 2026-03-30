import { defineStore } from 'pinia'

// Basic interface for a Room
interface Room {
  id: string
  x: number // Grid coordinate (e.g., 5 means 5th cell)
  y: number
  width: number // Measured in cells
  height: number
  label: string
}

export const useDungeonStore = defineStore('dungeon', {
  state: () => ({
    rooms: [] as Room[],
    gridSize: 40, // Pixel size of one cell
    currentMode: 'pan' as 'pan' | 'room' | 'path',
    selectedRoomId: null as string | null
  }),

  actions: {
    // Add a new room to the map
    addRoom(room: Room) {
      this.rooms.push(room)
    },

    // Set the interaction mode (Pan, Draw Room, etc.)
    setMode(mode: 'pan' | 'room' | 'path') {
      this.currentMode = mode
    },

    // Select a room to show details in the sidebar
    selectRoom(id: string | null) {
      this.selectedRoomId = id
    }
  },

  getters: {
    // Helper to find the currently selected room object
    selectedRoom: (state) =>
      state.rooms.find((r) => r.id === state.selectedRoomId)
  }
})
