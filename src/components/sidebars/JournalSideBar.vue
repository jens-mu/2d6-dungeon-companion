<script setup lang="ts">
import { useUIStore } from '../../stores/ui'
import CollapsibleDrawer from './CollapsibleDrawer.vue'

const store = useUIStore()
</script>

<template>
  <CollapsibleDrawer
    side="right"
    :is-open="store.isRightDrawerOpen"
    @toggle="store.isRightDrawerOpen = !store.isRightDrawerOpen"
  >
    <h3 class="mb-4 text-right text-sm font-bold tracking-wider text-slate-400 uppercase">
      {{ $t('sidebar.journal') }}
    </h3>
    <div class="text-right text-xs text-slate-500">Hier ist deine Geschichte...</div>
  </CollapsibleDrawer>
</template>
