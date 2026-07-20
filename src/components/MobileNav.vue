<template>
  <nav class="flex lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-dc-elevated border-t border-gray-200 dark:border-dc-border h-14 safe-area-bottom">
    <div class="flex items-center justify-around w-full max-w-lg mx-auto">
      <MobileNavItem
        :active="route.name === 'setup'"
        icon="home"
        :label="$t('sidebar.home')"
        @click="router.push('/')"
      />
      <MobileNavItem
        :active="route.name?.startsWith('game')"
        icon="game"
        :label="$t('sidebar.game')"
        @click="router.push('/game')"
      />
      <MobileNavItem
        :active="route.name === 'activity'"
        icon="activity"
        :label="$t('sidebar.activity')"
        @click="router.push('/activity')"
      />
      <MobileNavItem
        :active="route.name === 'theory'"
        icon="theory"
        :label="$t('sidebar.theory')"
        @click="router.push('/theory')"
      />
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MobileNavItem from './MobileNavItem.vue'

const router = useRouter()
const route = useRoute()
</script>
