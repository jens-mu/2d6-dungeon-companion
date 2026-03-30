<template>
  <MainLayout>
    <template #header>
      <h4 class="text-lg text-white">2D6 Dungeon Companion</h4>
    </template>

    <template #left-sidebar>
      <AssetsSideBar />
    </template>

    <template #right-sidebar>
      <StorySideBar />
    </template>

    <template #footer>
      <strong>hier ist der footer</strong>
    </template>

    <SetupScreen v-if="showSetup" @start="handleStartLevel" @cancel="showSetup = false" />
    <DungeonCanvas v-if="store.currentLevel" />
    <div v-else class="text-slate-600 italic">No level selected. Create one to start.</div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDungeonStore } from './stores/dungeon'

import DungeonCanvas from './components/DungeonCanvas.vue'
import SetupScreen from './components/SetupScreen.vue'
import AssetsSideBar from './components/sidebars/AssetsSideBar.vue'
import StorySideBar from './components/sidebars/StorySideBar.vue'
import MainLayout from './Layouts/MainLayout.vue'

const store = useDungeonStore()
const showSetup = ref(!store.isInitialized)

const handleStartLevel = (config: { width: number; height: number }) => {
  store.addNewLevel(config.width, config.height)
  showSetup.value = false
}
</script>

<style scoped></style>
