import type { Character } from "./types"

// Types for our storage
export interface StoredCharacterData {
  favorites: string[] // Array of character code points
  notes: Record<string, string> // Map of code point to note
}

// Default empty storage
const defaultStorage: StoredCharacterData = {
  favorites: [],
  notes: {},
}

// Get storage data
export function getStorageData(): StoredCharacterData {
  if (typeof window === "undefined") return defaultStorage

  try {
    const data = localStorage.getItem("charthing-data")
    return data ? JSON.parse(data) : defaultStorage
  } catch (error) {
    console.error("Failed to load storage data:", error)
    return defaultStorage
  }
}

// Save storage data
export function saveStorageData(data: StoredCharacterData): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("charthing-data", JSON.stringify(data))
  } catch (error) {
    console.error("Failed to save storage data:", error)
  }
}

// Toggle favorite status
export function toggleFavorite(codePoint: string): boolean {
  const data = getStorageData()
  const index = data.favorites.indexOf(codePoint)

  if (index === -1) {
    // Add to favorites
    data.favorites.push(codePoint)
    saveStorageData(data)
    return true
  } else {
    // Remove from favorites
    data.favorites.splice(index, 1)
    saveStorageData(data)
    return false
  }
}

// Check if character is favorited
export function isFavorite(codePoint: string): boolean {
  const data = getStorageData()
  return data.favorites.includes(codePoint)
}

// Save note for character
export function saveNote(codePoint: string, note: string): void {
  const data = getStorageData()

  if (note.trim() === "") {
    // Remove note if empty
    delete data.notes[codePoint]
  } else {
    // Save note
    data.notes[codePoint] = note
  }

  saveStorageData(data)
}

// Get note for character
export function getNote(codePoint: string): string {
  const data = getStorageData()
  return data.notes[codePoint] || ""
}

// Sort characters with favorites first
export function sortWithFavoritesFirst(characters: Character[]): Character[] {
  const data = getStorageData()
  const favorites = new Set(data.favorites)

  return [...characters].sort((a, b) => {
    const aIsFavorite = favorites.has(a.codePoint)
    const bIsFavorite = favorites.has(b.codePoint)

    if (aIsFavorite && !bIsFavorite) return -1
    if (!aIsFavorite && bIsFavorite) return 1
    return 0
  })
}
