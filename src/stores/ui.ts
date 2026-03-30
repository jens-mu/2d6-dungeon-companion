import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    // Drawer Status
    isLeftDrawerOpen: true,
    isRightDrawerOpen: true,

    // Editor Status
    currentMode: 'room' as 'room' | 'asset' | 'pan',
    currentSelectedAsset: null as string | null,

    // Zoom (aus dem Dungeon-Store hierher verschoben)
    currentZoom: 1.0,
  }),

  actions: {
    toggleLeftDrawer() {
      this.isLeftDrawerOpen = !this.isLeftDrawerOpen
    },
    toggleRightDrawer() {
      this.isRightDrawerOpen = !this.isRightDrawerOpen
    },
    setMode(mode: 'room' | 'asset' | 'pan') {
      this.currentMode = mode
      if (mode !== 'asset') this.currentSelectedAsset = null
    },
  },
})
