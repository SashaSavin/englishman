<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dc-bg text-gray-800 dark:text-dc-text-normal transition-colors flex">
    <Sidebar :expanded="sidebarExpanded" @toggle="sidebarExpanded = !sidebarExpanded" />

    <div class="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
      <AppHeader />
      <main class="flex-1 px-4 py-4 lg:py-8 max-w-4xl mx-auto w-full">
        <router-view v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
    </div>

    <MobileNav />
    <ToastContainer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../shared/composables/useTheme.js'
import AppHeader from '../components/AppHeader.vue'
import Sidebar from '../components/Sidebar.vue'
import MobileNav from '../components/MobileNav.vue'
import ToastContainer from '../components/ToastContainer.vue'

const { init } = useTheme()
init()
const sidebarExpanded = ref(true)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
