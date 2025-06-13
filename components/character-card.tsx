"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Copy, Star } from "lucide-react"
import type { Character } from "@/lib/types"
import { cn } from "@/lib/utils"
import { isFavorite, toggleFavorite } from "@/lib/storage"

interface CharacterCardProps {
  character: Character
  onSelect: () => void
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const [copied, setCopied] = useState(false)
  const [favorite, setFavorite] = useState(false)

  // Load favorite status on mount
  useEffect(() => {
    setFavorite(isFavorite(character.codePoint))
  }, [character.codePoint])

  const copyToClipboard = (e: any) => {
    e.stopPropagation()
    navigator.clipboard.writeText(character.symbol)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleFavoriteClick = (e: any) => {
    e.stopPropagation() // Prevent triggering the card click
    const newStatus = toggleFavorite(character.codePoint)
    setFavorite(newStatus)
  }

  // For control characters, display a placeholder
  const displaySymbol = character.category === "Cc" ? "␣" : character.symbol

  return (
    <Card
      className={cn(
        "bg-gray-900 border-gray-800 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-900/20 relative",
        copied && "border-green-500",
        favorite && "border-yellow-500",
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4 flex flex-col items-center justify-center">
        <div className="text-3xl mb-2">{displaySymbol}</div>
        <div className="text-xs text-gray-400 text-center truncate w-full">{character.name}</div>
        <div className="text-xs text-gray-500 mt-1">{character.code}</div>
        <button
          className={cn(
            "absolute top-2 left-2 p-1 rounded-full z-10",
            favorite ? "text-yellow-400" : "text-gray-500 hover:text-gray-300",
          )}
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
        </button>
        <button
          className={cn(
            "absolute top-2 right-2 p-1 rounded-full z-10",
            copied ? "text-green-500" : "text-gray-500 hover:text-gray-300",
          )}
          onClick={copyToClipboard}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </CardContent>
    </Card>
  )
}
