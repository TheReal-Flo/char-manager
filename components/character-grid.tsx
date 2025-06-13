"use client"

import { useState, useEffect } from "react"
import { CharacterCard } from "@/components/character-card"
import { Pagination } from "@/components/pagination"
import { CharacterPreview } from "@/components/character-preview"
import { loadCharacters } from "@/lib/character-data"
import { sortWithFavoritesFirst, getNote } from "@/lib/storage"
import type { Character } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface CharacterGridProps {
  initialCharacters: Character[]
  searchQuery?: string
}

export default function CharacterGrid({ initialCharacters, searchQuery = "" }: CharacterGridProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(initialCharacters)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const charactersPerPage = 36

  useEffect(() => {
    async function fetchCharacters() {
      setIsLoading(true)
      try {
        const data = await loadCharacters()
        if (data.length > 0) {
          // Sort with favorites first
          const sortedData = sortWithFavoritesFirst(data)
          setCharacters(sortedData)
          setFilteredCharacters(sortedData)
        }
      } catch (error) {
        console.error("Failed to load characters:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  useEffect(() => {
    // Re-sort characters when component re-renders (e.g., after toggling favorites)
    if (!isLoading && characters.length > 0) {
      const sortedData = sortWithFavoritesFirst(characters)
      setCharacters(sortedData)

      // Apply current filters
      filterCharacters(sortedData, searchQuery, showOnlyFavorites)
    }
  }, [showOnlyFavorites])

  useEffect(() => {
    if (characters.length > 0) {
      filterCharacters(characters, searchQuery, showOnlyFavorites)
    }
  }, [searchQuery, characters])

  const filterCharacters = (chars: Character[], query: string, onlyFavorites: boolean) => {
    let filtered = [...chars]

    if (query) {
      filtered = filtered.filter((char) => {
        const note = getNote(char.codePoint)
        return (
          char.name.toLowerCase().includes(query.toLowerCase()) ||
          char.code.toLowerCase().includes(query.toLowerCase()) ||
          (note && note.toLowerCase().includes(query.toLowerCase()))
        )
      })
    }

    if (onlyFavorites) {
      filtered = sortWithFavoritesFirst(filtered).filter((_, index) => index < charactersPerPage)
    }

    setFilteredCharacters(filtered)
  }

  // Add separate effects for handling page resets
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, showOnlyFavorites])

  const indexOfLastCharacter = currentPage * charactersPerPage
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)

  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCharacterUpdate = () => {
    // Re-sort characters when a character is updated (e.g., favorited)
    const sortedData = sortWithFavoritesFirst(characters)
    setCharacters(sortedData)
    filterCharacters(sortedData, searchQuery, showOnlyFavorites)
  }

  return (
    <div>
      {selectedCharacter && (
        <CharacterPreview
          character={selectedCharacter}
          onClose={() => {
            setSelectedCharacter(null)
            handleCharacterUpdate()
          }}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400">
          Showing {indexOfFirstCharacter + 1}-{Math.min(indexOfLastCharacter, filteredCharacters.length)} of{" "}
          {filteredCharacters.length} characters
        </p>

        <Button
          variant={showOnlyFavorites ? "default" : "outline"}
          size="sm"
          className={showOnlyFavorites ? "bg-yellow-600 hover:bg-yellow-700" : ""}
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        >
          <Star className="h-4 w-4 mr-2" fill={showOnlyFavorites ? "currentColor" : "none"} />
          {showOnlyFavorites ? "All Characters" : "Favorites Only"}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-3 w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {currentCharacters.map((character) => (
            <CharacterCard
              key={character.codePoint}
              character={character}
              onSelect={() => setSelectedCharacter(character)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  )
}
