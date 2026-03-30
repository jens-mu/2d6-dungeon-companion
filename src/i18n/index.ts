import { createI18n } from 'vue-i18n'

const messages = {
  de: {
    header: {
      title: '2D6 Dungeon Companion',
      new_level: 'Neues Level',
      settings: 'Einstellungen',
    },
    sidebar: {
      assets: 'Assets & Objekte',
      journal: 'Dein Logbuch',
      tools: 'Werkzeuge',
      room: 'Raum',
      path: 'Gang',
      pan: 'Verschieben',
    },
    footer: {
      status: 'Bereit',
      zoom: 'Zoom',
    },
    setup: {
      title: 'Bereite dein Pergament vor',
      start: 'Abenteuer beginnen',
      width: 'Breite',
      height: 'Höhe',
    },
  },
  en: {
    header: {
      title: '2D6 Dungeon Companion',
      new_level: 'New Level',
      settings: 'Settings',
    },
    sidebar: {
      assets: 'Assets & Objects',
      journal: 'Your Journal',
      tools: 'Tools',
      room: 'Room',
      path: 'Path',
      pan: 'Pan',
    },
    footer: {
      status: 'Ready',
      zoom: 'Zoom',
    },
    setup: {
      title: 'Prepare Your Parchment',
      start: 'Start Adventure',
      width: 'Width',
      height: 'Height',
    },
  },
}

export const i18n = createI18n({
  legacy: false, // Wichtig für Composition API (Vue 3)
  locale: 'de', // Standard-Sprache
  fallbackLocale: 'en',
  messages,
})
