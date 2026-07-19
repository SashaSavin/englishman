import { ref } from 'vue'

const ACTIVITY_KEY = 'engl-activity'

const data = ref(load())

function load() {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save() {
  try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(data.value)) } catch {}
}

export function useActivity() {
  function logActivity() {
    const key = new Date().toISOString().slice(0, 10)
    data.value[key] = (data.value[key] || 0) + 1
    save()
  }

  function getWeeks() {
    const today = new Date()
    const start = new Date(today)
    start.setDate(start.getDate() - 363)
    start.setHours(0, 0, 0, 0)

    const days = []
    for (let i = 0; i < 364; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      const key = d.toISOString().slice(0, 10)
      days.push({ date: key, count: data.value[key] || 0, dow: d.getDay() })
    }

    const weeks = []
    let week = []
    for (let i = 0; i < days[0].dow; i++) {
      week.push(null)
    }
    for (const day of days) {
      week.push(day)
      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    }
    if (week.length) {
      while (week.length < 7) week.push(null)
      weeks.push(week)
    }
    return weeks
  }

  function getStats() {
    const total = Object.values(data.value).reduce((s, v) => s + v, 0)
    const days = Object.keys(data.value).length
    const currentStreak = calcStreak()
    return { total, days, currentStreak }
  }

  function calcStreak() {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      if ((data.value[key] || 0) > 0) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  }

  return { data, logActivity, getWeeks, getStats }
}
