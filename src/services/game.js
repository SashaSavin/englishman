const BASE = ''

async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export function createGame(playerName) {
  return api('/api/games', { method: 'POST', body: JSON.stringify({ playerName }) })
}

export function joinGame(code, playerName) {
  return api(`/api/games/${code}/join`, { method: 'POST', body: JSON.stringify({ playerName }) })
}

export function startGame(code, token) {
  return api(`/api/games/${code}/start`, { method: 'POST', body: JSON.stringify({ token }) })
}

export function submitResult(code, token, score, total, timeSeconds) {
  return api(`/api/games/${code}/submit`, {
    method: 'POST',
    body: JSON.stringify({ token, score, total, timeSeconds }),
  })
}

export function getGame(code) {
  return api(`/api/games/${code}`)
}

export function getGameStatus(code) {
  return api(`/api/games/${code}`)
}
