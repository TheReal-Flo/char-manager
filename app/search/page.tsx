import { SearchBar } from "@/components/search-bar"
import CharacterGrid from "@/components/character-grid"
import { getFallbackCharacters } from "@/lib/character-data"

interface SearchPageProps {
  searchParams: { q: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
            CharThing
          </h1>
          <p className="text-gray-400 mb-6">Browse, search, and copy ASCII characters with ease</p>
          <SearchBar />
        </header>

        <main>
          <div className="mb-8">
            <h2 className="text-2xl font-medium mb-4">
              Search results for: <span className="text-purple-400">"{query}"</span>
            </h2>
            <CharacterGrid initialCharacters={getFallbackCharacters()} searchQuery={query} />
          </div>
        </main>
      </div>
    </div>
  )
}
