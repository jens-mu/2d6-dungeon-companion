<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden bg-slate-900 text-slate-200">
    <header
      class="z-20 flex h-12 w-full flex-none items-center justify-between border-b border-slate-700 bg-slate-800 px-4"
    >
      <slot name="header"></slot>
    </header>

    <div class="flex w-full flex-1 overflow-hidden">
      <aside class="w-64 flex-none border-r border-slate-700 bg-slate-800 p-4">
        <slot name="left-sidebar"></slot>
      </aside>

      <main class="relative flex-1 overflow-hidden bg-slate-950">
        <slot></slot>
      </main>

      <aside class="w-64 flex-none border-l border-slate-700 bg-slate-800 p-4">
        <slot name="right-sidebar"></slot>
      </aside>
    </div>
    <footer
      class="z-20 flex h-12 w-full flex-none items-center justify-between border-t border-slate-700 bg-slate-800 px-4"
    >
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
