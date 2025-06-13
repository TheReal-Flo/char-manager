import CharacterGrid from "@/components/character-grid"
import { SearchBar } from "@/components/search-bar"
import { getFallbackCharacters } from "@/lib/character-data"

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2 text-center">
            CharManager
          </h1>
          <p className="text-gray-400 mb-6 text-center">Browse, search, manage, and copy Unicode characters with ease</p>
          <SearchBar />
        </header>

        <main>
          <CharacterGrid initialCharacters={getFallbackCharacters()} />
        </main>
      </div>
    </div>
  )
}
