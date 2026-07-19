import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'setup',
    component: () => import('../../modules/quiz/pages/QuizSetupPage.vue'),
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../../modules/quiz/pages/QuizSessionPage.vue'),
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('../../modules/quiz/pages/QuizResultsPage.vue'),
  },
  {
    path: '/review',
    name: 'review',
    component: () => import('../../modules/quiz/pages/QuizReviewPage.vue'),
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('../../modules/quiz/pages/BookmarksPage.vue'),
  },
  {
    path: '/theory',
    name: 'theory',
    component: () => import('../../modules/theory/pages/TheoryPage.vue'),
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import('../../modules/activity/pages/ActivityPage.vue'),
  },
  {
    path: '/game',
    name: 'game-menu',
    component: () => import('../../modules/game/pages/GameMenu.vue'),
  },
  {
    path: '/game/:code',
    name: 'game-lobby',
    component: () => import('../../modules/game/pages/GameLobby.vue'),
  },
  {
    path: '/game/:code/play',
    name: 'game-play',
    component: () => import('../../modules/game/pages/GamePlay.vue'),
  },
  {
    path: '/game/:code/results',
    name: 'game-results',
    component: () => import('../../modules/game/pages/GameResults.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
