<template>
  <aside
    class="hidden lg:flex lg:flex-col h-screen sticky top-0 bg-white dark:bg-dc-surface transition-all duration-200 flex-shrink-0 z-30 relative"
    :class="expanded ? 'w-56' : 'w-14'"
  >
    <div
      class="h-14 flex items-center border-b border-gray-200 dark:border-dc-border flex-shrink-0 relative"
    >
      <span
        v-if="expanded"
        class="text-lg font-bold tracking-tight text-brand dark:text-brand-muted truncate pl-3"
      >
        Englishman
      </span>
      <span
        v-else
        class="text-lg font-bold text-brand dark:text-brand-muted mx-auto"
        >Em</span
      >
    </div>

    <button
      @click="$emit('toggle')"
      class="absolute -right-3 top-10 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-dc-surface border border-gray-200 dark:border-dc-border text-gray-400 dark:text-dc-text-muted hover:text-gray-600 dark:hover:text-dc-text-normal hover:border-gray-300 dark:hover:border-gray-600 transition-colors z-40"
      :title="$t('sidebar.collapse')"
    >
      <ChevronLeft
        class="w-3.5 h-3.5 transition-transform duration-300"
        :class="{ 'rotate-180': !expanded }"
        stroke-width="2"
      />
    </button>

    <nav class="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
      <SidebarItem
        :active="route.name === 'setup'"
        :expanded="expanded"
        icon="home"
        :label="$t('sidebar.home')"
        @click="router.push('/')"
      />
      <SidebarItem
        :active="route.name === 'theory'"
        :expanded="expanded"
        icon="theory"
        :label="$t('sidebar.theory')"
        @click="router.push('/theory')"
      />
      <SidebarItem
        :active="route.name === 'activity'"
        :expanded="expanded"
        icon="activity"
        :label="$t('sidebar.activity')"
        @click="router.push('/activity')"
      />
      <SidebarItem
        :active="route.name?.startsWith('game')"
        :expanded="expanded"
        icon="game"
        :label="$t('sidebar.game')"
        @click="router.push('/game')"
      />
    </nav>

    <div
      class="py-2 px-2 border-t border-gray-200 dark:border-dc-border space-y-0.5"
    >
      <SidebarItem
        :expanded="expanded"
        :icon="isDark ? 'sun' : 'moon'"
        :label="isDark ? $t('sidebar.lightMode') : $t('sidebar.darkMode')"
        @click="toggleTheme"
      />
      <SidebarItem
        :expanded="expanded"
        icon="globe"
        :label="locale === 'en' ? 'Русский' : 'English'"
        @click="toggleLocale"
      />
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTheme } from "../shared/composables/useTheme.js";
import { ChevronLeft } from "@lucide/vue";
import SidebarItem from "./SidebarItem.vue";

defineProps({ expanded: Boolean });
defineEmits(["toggle"]);

const router = useRouter();
const route = useRoute();
const { locale } = useI18n();
const { isDark, toggle: toggleTheme } = useTheme();

function toggleLocale() {
  const next = locale.value === "en" ? "ru" : "en";
  locale.value = next;
  try {
    localStorage.setItem("engl-locale", next);
  } catch {}
}
</script>
