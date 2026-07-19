import { ref, watch } from 'vue'

const BOOKMARKS_KEY = 'engl-bookmarks'

function loadIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

function saveIds(ids) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...ids]))
  } catch {}
}

const bookmarks = ref(loadIds())

watch(bookmarks, (val) => saveIds(val), { deep: true })

export function useBookmarks() {
  function toggle(id) {
    const next = new Set(bookmarks.value)
    next.has(id) ? next.delete(id) : next.add(id)
    bookmarks.value = next
  }

  function isBookmarked(id) {
    return bookmarks.value.has(id)
  }

  return { bookmarks, toggle, isBookmarked }
}
