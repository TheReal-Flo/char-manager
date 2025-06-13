"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Copy, Check, Star } from "lucide-react"
import { useState, useEffect } from "react"
import type { Character } from "@/lib/types"
import { getNote, saveNote, isFavorite, toggleFavorite } from "@/lib/storage"
import { cn } from "@/lib/utils"

interface CharacterPreviewProps {
  character: Character
  onClose: () => void
}

export function CharacterPreview({ character, onClose }: CharacterPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [note, setNote] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // Load favorite status and note on mount
  useEffect(() => {
    setFavorite(isFavorite(character.codePoint))
    setNote(getNote(character.codePoint))
  }, [character.codePoint])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(character.symbol)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleFavoriteClick = () => {
    const newStatus = toggleFavorite(character.codePoint)
    setFavorite(newStatus)
  }

  const handleSaveNote = () => {
    saveNote(character.codePoint, note)
    setIsEditing(false)
  }

  // For control characters, display a placeholder
  const displaySymbol = character.category === "Cc" ? "␣" : character.symbol

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <Card className="bg-gray-900 border-gray-800 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">Character Preview</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="text-7xl mb-4 relative">
              {displaySymbol}
              <button
                className={cn(
                  "absolute -top-4 -right-4 p-1 rounded-full",
                  favorite ? "text-yellow-400" : "text-gray-500 hover:text-gray-300",
                )}
                onClick={handleFavoriteClick}
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
              </button>
            </div>
            <h3 className="text-lg font-medium mb-1">{character.name}</h3>
            <p className="text-sm text-gray-400 mb-2">Code Point: U+{character.codePoint}</p>
            <p className="text-sm text-gray-400 mb-4">Category: {character.category}</p>
            <Button
              className="flex items-center gap-2 mb-6"
              onClick={copyToClipboard}
              variant={copied ? "outline" : "default"}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy to Clipboard
                </>
              )}
            </Button>

            <div className="w-full border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-300">Notes</h4>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    {note ? "Edit" : "Add Note"}
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note about this character..."
                    className="bg-gray-800 border-gray-700"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveNote}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="min-h-[60px] bg-gray-800 rounded-md p-3 text-sm">
                  {note ? note : <span className="text-gray-500">No notes added yet.</span>}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
