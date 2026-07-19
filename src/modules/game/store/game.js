import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as api from '../../../services/game.js'

export const useGameStore = defineStore('game', () => {
  const game = ref(null)
  const playerId = ref('')
  const token = ref('')
  const playerName = ref('')
  const code = ref('')
  const loading = ref(false)
  const error = ref('')
  let pollTimer = null

  const me = computed(() => game.value?.players?.find(p => p.id === playerId.value) || null)
  const opponent = computed(() => game.value?.players?.find(p => p.id !== playerId.value) || null)
  const status = computed(() => game.value?.status || 'waiting')
  const questions = computed(() => game.value?.questions || [])
  const isCreator = computed(() => {
    if (!game.value?.players?.length) return true
    return game.value.players[0].id === playerId.value
  })

  async function create(name) {
    loading.value = true
    error.value = ''
    try {
      const data = await api.createGame(name)
      playerId.value = data.playerId
      token.value = data.token
      code.value = data.code
      playerName.value = name
      game.value = await api.getGame(code.value)
      startPolling()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function join(name, roomCode) {
    loading.value = true
    error.value = ''
    try {
      const data = await api.joinGame(roomCode, name)
      playerId.value = data.playerId
      token.value = data.token
      code.value = roomCode
      playerName.value = name
      game.value = await api.getGame(code.value)
      startPolling()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function start() {
    try {
      await api.startGame(code.value, token.value)
      game.value = await api.getGame(code.value)
    } catch (e) {
      error.value = e.message
    }
  }

  async function submit(score, total, timeSeconds) {
    try {
      const res = await api.submitResult(code.value, token.value, score, total, timeSeconds)
      game.value = await api.getGame(code.value)
      return res
    } catch (e) {
      error.value = e.message
      return null
    }
  }

  function startPolling() {
    stopPolling()
    pollTimer = setInterval(async () => {
      try {
        game.value = await api.getGame(code.value)
      } catch (_) {}
    }, 2000)
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  function reset() {
    stopPolling()
    game.value = null
    playerId.value = ''
    token.value = ''
    playerName.value = ''
    code.value = ''
    loading.value = false
    error.value = ''
  }

  return { game, playerId, token, playerName, code, loading, error, me, opponent, status, questions, isCreator, create, join, start, submit, startPolling, stopPolling, reset }
})
