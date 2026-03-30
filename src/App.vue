<template>
  <MainLayout>
    <template #header>
      <h4 class="text-lg text-white">{{ $t('header.title') }}</h4>
    </template>

    <template #left-sidebar>
      <AssetsSideBar />
    </template>

    <template #right-sidebar>
      <JournalSideBar />
    </template>

    <template #footer>
      <strong>{{ $t('footer.status') }}</strong>
    </template>

    <div class="relative h-full w-full">
      <SetupScreen v-if="showSetup" @start="handleStartLevel" @cancel="showSetup = false" />

      <template v-else-if="store.currentLevel">
        <ZoomControl />
        <DungeonCanvas />
      </template>

      <div v-else class="flex h-full items-center justify-center">
        <button
          @click="showSetup = true"
          class="rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-500"
        >
          {{ $t('setup.start') }}
        </button>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDungeonStore } from './stores/dungeon'

import DungeonCanvas from './components/canvas/DungeonCanvas.vue'
import SetupScreen from './components/widgets/SetupScreen.vue'
import AssetsSideBar from './components/sidebars/AssetsSideBar.vue'
import JournalSideBar from './components/sidebars/JournalSideBar.vue'
import MainLayout from './Layouts/MainLayout.vue'
import ZoomControl from './components/widgets/ZoomControl.vue'

const store = useDungeonStore()
const showSetup = ref(!store.isInitialized)

const handleStartLevel = (config: { width: number; height: number }) => {
  store.addNewLevel(config.width, config.height)
  showSetup.value = false
}
</script>

<style scoped></style>
