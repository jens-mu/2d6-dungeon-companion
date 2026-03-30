<script setup lang="ts">
import { useUIStore } from '../../stores/ui'
import CollapsibleDrawer from './CollapsibleDrawer.vue'

const store = useUIStore()
</script>

<template>
  <CollapsibleDrawer
    side="left"
    :is-open="store.isLeftDrawerOpen"
    @toggle="store.isLeftDrawerOpen = !store.isLeftDrawerOpen"
  >
    <h3 class="mb-4 text-sm font-bold tracking-wider text-slate-400 uppercase">
      {{ $t('sidebar.assets') }}
    </h3>
    <div class="text-xs text-slate-500">Asset-Liste kommt hier...</div>
  </CollapsibleDrawer>
</template>
