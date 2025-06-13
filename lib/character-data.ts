import type { Character } from "./types"

// Fallback data in case the fetch fails
const fallbackCharacters: Character[] = [
  { codePoint: "0020", symbol: " ", name: "SPACE", category: "Zs", code: "\\u0020" },
  { codePoint: "0021", symbol: "!", name: "EXCLAMATION MARK", category: "Po", code: "\\u0021" },
  { codePoint: "0022", symbol: '"', name: "QUOTATION MARK", category: "Po", code: "\\u0022" },
  { codePoint: "0023", symbol: "#", name: "NUMBER SIGN", category: "Po", code: "\\u0023" },
  { codePoint: "0024", symbol: "$", name: "DOLLAR SIGN", category: "Sc", code: "\\u0024" },
  { codePoint: "0025", symbol: "%", name: "PERCENT SIGN", category: "Po", code: "\\u0025" },
]

export function getFallbackCharacters(): Character[] {
  return fallbackCharacters
}

export async function loadCharacters(): Promise<Character[]> {
  try {
    const response = await fetch("/unicode-data.txt")
    const text = await response.text()

    return parseUnicodeData(text)
  } catch (error) {
    console.error("Failed to load character data:", error)
    return getFallbackCharacters()
  }
}

function parseUnicodeData(data: string): Character[] {
  const lines = data.split("\n").filter((line) => line.trim() !== "")

  return lines.map((line) => {
    const parts = line.split(";")
    const codePoint = parts[0]
    const name = parts[1] === "<control>" ? parts[9] : parts[1]
    const category = parts[2]

    // Convert the code point from hex to a character
    const symbol = String.fromCodePoint(Number.parseInt(codePoint, 16))

    return {
      codePoint,
      symbol,
      name,
      category,
      code: `\\u${codePoint.padStart(4, "0")}`,
    }
  })
}

export const characterCategories: Record<string, Character[]> = {
  symbols: [
    { symbol: "©", name: "Copyright Sign", code: "\\u00A9", category: "symbols" },
    { symbol: "®", name: "Registered Sign", code: "\\u00AE", category: "symbols" },
    { symbol: "™", name: "Trade Mark Sign", code: "\\u2122", category: "symbols" },
    { symbol: "§", name: "Section Sign", code: "\\u00A7", category: "symbols" },
    { symbol: "¶", name: "Paragraph Sign", code: "\\u00B6", category: "symbols" },
    { symbol: "†", name: "Dagger", code: "\\u2020", category: "symbols" },
    { symbol: "‡", name: "Double Dagger", code: "\\u2021", category: "symbols" },
    { symbol: "•", name: "Bullet", code: "\\u2022", category: "symbols" },
    { symbol: "‣", name: "Triangular Bullet", code: "\\u2023", category: "symbols" },
    { symbol: "⁃", name: "Hyphen Bullet", code: "\\u2043", category: "symbols" },
    { symbol: "⁎", name: "Low Asterisk", code: "\\u204E", category: "symbols" },
    { symbol: "⁂", name: "Asterism", code: "\\u2042", category: "symbols" },
    { symbol: "…", name: "Horizontal Ellipsis", code: "\\u2026", category: "symbols" },
    { symbol: "⋮", name: "Vertical Ellipsis", code: "\\u22EE", category: "symbols" },
    { symbol: "⋯", name: "Midline Horizontal Ellipsis", code: "\\u22EF", category: "symbols" },
    { symbol: "⋰", name: "Up Right Diagonal Ellipsis", code: "\\u22F0", category: "symbols" },
    { symbol: "⋱", name: "Down Right Diagonal Ellipsis", code: "\\u22F1", category: "symbols" },
    { symbol: "★", name: "Black Star", code: "\\u2605", category: "symbols" },
    { symbol: "☆", name: "White Star", code: "\\u2606", category: "symbols" },
    { symbol: "♠", name: "Black Spade Suit", code: "\\u2660", category: "symbols" },
    { symbol: "♣", name: "Black Club Suit", code: "\\u2663", category: "symbols" },
    { symbol: "♥", name: "Black Heart Suit", code: "\\u2665", category: "symbols" },
    { symbol: "♦", name: "Black Diamond Suit", code: "\\u2666", category: "symbols" },
    { symbol: "☀", name: "Black Sun with Rays", code: "\\u2600", category: "symbols" },
    { symbol: "☁", name: "Cloud", code: "\\u2601", category: "symbols" },
    { symbol: "☂", name: "Umbrella", code: "\\u2602", category: "symbols" },
    { symbol: "☃", name: "Snowman", code: "\\u2603", category: "symbols" },
    { symbol: "☼", name: "White Sun with Rays", code: "\\u263C", category: "symbols" },
    { symbol: "☾", name: "Last Quarter Moon", code: "\\u263E", category: "symbols" },
    { symbol: "☿", name: "Mercury", code: "\\u263F", category: "symbols" },
  ],
  math: [
    { symbol: "±", name: "Plus-Minus Sign", code: "\\u00B1", category: "math" },
    { symbol: "×", name: "Multiplication Sign", code: "\\u00D7", category: "math" },
    { symbol: "÷", name: "Division Sign", code: "\\u00F7", category: "math" },
    { symbol: "≠", name: "Not Equal To", code: "\\u2260", category: "math" },
    { symbol: "≈", name: "Almost Equal To", code: "\\u2248", category: "math" },
    { symbol: "≤", name: "Less-Than or Equal To", code: "\\u2264", category: "math" },
    { symbol: "≥", name: "Greater-Than or Equal To", code: "\\u2265", category: "math" },
    { symbol: "∞", name: "Infinity", code: "\\u221E", category: "math" },
    { symbol: "√", name: "Square Root", code: "\\u221A", category: "math" },
    { symbol: "∑", name: "N-Ary Summation", code: "\\u2211", category: "math" },
    { symbol: "∏", name: "N-Ary Product", code: "\\u220F", category: "math" },
    { symbol: "∫", name: "Integral", code: "\\u222B", category: "math" },
    { symbol: "∂", name: "Partial Differential", code: "\\u2202", category: "math" },
    { symbol: "∇", name: "Nabla", code: "\\u2207", category: "math" },
    { symbol: "∈", name: "Element Of", code: "\\u2208", category: "math" },
    { symbol: "∉", name: "Not an Element Of", code: "\\u2209", category: "math" },
    { symbol: "∋", name: "Contains as Member", code: "\\u220B", category: "math" },
    { symbol: "∩", name: "Intersection", code: "\\u2229", category: "math" },
    { symbol: "∪", name: "Union", code: "\\u222A", category: "math" },
    { symbol: "⊂", name: "Subset Of", code: "\\u2282", category: "math" },
    { symbol: "⊃", name: "Superset Of", code: "\\u2283", category: "math" },
    { symbol: "⊆", name: "Subset of or Equal To", code: "\\u2286", category: "math" },
    { symbol: "⊇", name: "Superset of or Equal To", code: "\\u2287", category: "math" },
    { symbol: "⊕", name: "Circled Plus", code: "\\u2295", category: "math" },
    { symbol: "⊗", name: "Circled Times", code: "\\u2297", category: "math" },
    { symbol: "⊥", name: "Up Tack", code: "\\u22A5", category: "math" },
    { symbol: "⋅", name: "Dot Operator", code: "\\u22C5", category: "math" },
    { symbol: "∠", name: "Angle", code: "\\u2220", category: "math" },
    { symbol: "∡", name: "Measured Angle", code: "\\u2221", category: "math" },
    { symbol: "∢", name: "Spherical Angle", code: "\\u2222", category: "math" },
  ],
  arrows: [
    { symbol: "←", name: "Leftwards Arrow", code: "\\u2190", category: "arrows" },
    { symbol: "→", name: "Rightwards Arrow", code: "\\u2192", category: "arrows" },
    { symbol: "↑", name: "Upwards Arrow", code: "\\u2191", category: "arrows" },
    { symbol: "↓", name: "Downwards Arrow", code: "\\u2193", category: "arrows" },
    { symbol: "↔", name: "Left Right Arrow", code: "\\u2194", category: "arrows" },
    { symbol: "↕", name: "Up Down Arrow", code: "\\u2195", category: "arrows" },
    { symbol: "↖", name: "North West Arrow", code: "\\u2196", category: "arrows" },
    { symbol: "↗", name: "North East Arrow", code: "\\u2197", category: "arrows" },
    { symbol: "↘", name: "South East Arrow", code: "\\u2198", category: "arrows" },
    { symbol: "↙", name: "South West Arrow", code: "\\u2199", category: "arrows" },
    { symbol: "↩", name: "Leftwards Arrow with Hook", code: "\\u21A9", category: "arrows" },
    { symbol: "↪", name: "Rightwards Arrow with Hook", code: "\\u21AA", category: "arrows" },
    { symbol: "↺", name: "Anticlockwise Open Circle Arrow", code: "\\u21BA", category: "arrows" },
    { symbol: "↻", name: "Clockwise Open Circle Arrow", code: "\\u21BB", category: "arrows" },
    { symbol: "⇐", name: "Leftwards Double Arrow", code: "\\u21D0", category: "arrows" },
    { symbol: "⇒", name: "Rightwards Double Arrow", code: "\\u21D2", category: "arrows" },
    { symbol: "⇑", name: "Upwards Double Arrow", code: "\\u21D1", category: "arrows" },
    { symbol: "⇓", name: "Downwards Double Arrow", code: "\\u21D3", category: "arrows" },
    { symbol: "⇔", name: "Left Right Double Arrow", code: "\\u21D4", category: "arrows" },
    { symbol: "⇕", name: "Up Down Double Arrow", code: "\\u21D5", category: "arrows" },
    { symbol: "⇠", name: "Leftwards Arrow from Bar", code: "\\u21E0", category: "arrows" },
    { symbol: "⇢", name: "Rightwards Arrow from Bar", code: "\\u21E2", category: "arrows" },
    { symbol: "⇡", name: "Upwards Arrow from Bar", code: "\\u21E1", category: "arrows" },
    { symbol: "⇣", name: "Downwards Arrow from Bar", code: "\\u21E3", category: "arrows" },
    { symbol: "⇤", name: "Leftwards Arrow to Bar", code: "\\u21E4", category: "arrows" },
    { symbol: "⇥", name: "Rightwards Arrow to Bar", code: "\\u21E5", category: "arrows" },
    { symbol: "⇦", name: "Leftwards White Arrow", code: "\\u21E6", category: "arrows" },
    { symbol: "⇨", name: "Rightwards White Arrow", code: "\\u21E8", category: "arrows" },
    { symbol: "⇧", name: "Upwards White Arrow", code: "\\u21E7", category: "arrows" },
    { symbol: "⇩", name: "Downwards White Arrow", code: "\\u21E9", category: "arrows" },
  ],
  currency: [
    { symbol: "$", name: "Dollar Sign", code: "\\u0024", category: "currency" },
    { symbol: "¢", name: "Cent Sign", code: "\\u00A2", category: "currency" },
    { symbol: "£", name: "Pound Sign", code: "\\u00A3", category: "currency" },
    { symbol: "€", name: "Euro Sign", code: "\\u20AC", category: "currency" },
    { symbol: "¥", name: "Yen Sign", code: "\\u00A5", category: "currency" },
    { symbol: "₹", name: "Indian Rupee Sign", code: "\\u20B9", category: "currency" },
    { symbol: "₽", name: "Ruble Sign", code: "\\u20BD", category: "currency" },
    { symbol: "₩", name: "Won Sign", code: "\\u20A9", category: "currency" },
    { symbol: "₱", name: "Peso Sign", code: "\\u20B1", category: "currency" },
    { symbol: "₿", name: "Bitcoin Sign", code: "\\u20BF", category: "currency" },
    { symbol: "₴", name: "Hryvnia Sign", code: "\\u20B4", category: "currency" },
    { symbol: "₺", name: "Turkish Lira Sign", code: "\\u20BA", category: "currency" },
    { symbol: "₼", name: "Manat Sign", code: "\\u20BC", category: "currency" },
    { symbol: "₾", name: "Lari Sign", code: "\\u20BE", category: "currency" },
    { symbol: "₫", name: "Dong Sign", code: "\\u20AB", category: "currency" },
    { symbol: "₲", name: "Guarani Sign", code: "\\u20B2", category: "currency" },
    { symbol: "₪", name: "New Sheqel Sign", code: "\\u20AA", category: "currency" },
    { symbol: "₡", name: "Colon Sign", code: "\\u20A1", category: "currency" },
    { symbol: "₢", name: "Cruzeiro Sign", code: "\\u20A2", category: "currency" },
    { symbol: "₣", name: "French Franc Sign", code: "\\u20A3", category: "currency" },
    { symbol: "₤", name: "Lira Sign", code: "\\u20A4", category: "currency" },
    { symbol: "₥", name: "Mill Sign", code: "\\u20A5", category: "currency" },
    { symbol: "₦", name: "Naira Sign", code: "\\u20A6", category: "currency" },
    { symbol: "₧", name: "Peseta Sign", code: "\\u20A7", category: "currency" },
    { symbol: "₨", name: "Rupee Sign", code: "\\u20A8", category: "currency" },
    { symbol: "₮", name: "Tugrik Sign", code: "\\u20AE", category: "currency" },
    { symbol: "₯", name: "Drachma Sign", code: "\\u20AF", category: "currency" },
    { symbol: "₰", name: "German Penny Sign", code: "\\u20B0", category: "currency" },
    { symbol: "₳", name: "Austral Sign", code: "\\u20B3", category: "currency" },
    { symbol: "₵", name: "Cedi Sign", code: "\\u20B5", category: "currency" },
  ],
  punctuation: [
    { symbol: "¡", name: "Inverted Exclamation Mark", code: "\\u00A1", category: "punctuation" },
    { symbol: "¿", name: "Inverted Question Mark", code: "\\u00BF", category: "punctuation" },
    { symbol: "‒", name: "Figure Dash", code: "\\u2012", category: "punctuation" },
    { symbol: "–", name: "En Dash", code: "\\u2013", category: "punctuation" },
    { symbol: "—", name: "Em Dash", code: "\\u2014", category: "punctuation" },
    { symbol: "―", name: "Horizontal Bar", code: "\\u2015", category: "punctuation" },
    { symbol: "'", name: "Left Single Quotation Mark", code: "\\u2018", category: "punctuation" },
    { symbol: "'", name: "Right Single Quotation Mark", code: "\\u2019", category: "punctuation" },
    { symbol: "‚", name: "Single Low-9 Quotation Mark", code: "\\u201A", category: "punctuation" },
    { symbol: "‛", name: "Single High-Reversed-9 Quotation Mark", code: "\\u201B", category: "punctuation" },
    { symbol: '"', name: "Left Double Quotation Mark", code: "\\u201C", category: "punctuation" },
    { symbol: '"', name: "Right Double Quotation Mark", code: "\\u201D", category: "punctuation" },
    { symbol: "„", name: "Double Low-9 Quotation Mark", code: "\\u201E", category: "punctuation" },
    { symbol: "‟", name: "Double High-Reversed-9 Quotation Mark", code: "\\u201F", category: "punctuation" },
    { symbol: "«", name: "Left-Pointing Double Angle Quotation Mark", code: "\\u00AB", category: "punctuation" },
    { symbol: "»", name: "Right-Pointing Double Angle Quotation Mark", code: "\\u00BB", category: "punctuation" },
    { symbol: "‹", name: "Single Left-Pointing Angle Quotation Mark", code: "\\u2039", category: "punctuation" },
    { symbol: "›", name: "Single Right-Pointing Angle Quotation Mark", code: "\\u203A", category: "punctuation" },
    { symbol: "‐", name: "Hyphen", code: "\\u2010", category: "punctuation" },
    { symbol: "‑", name: "Non-Breaking Hyphen", code: "\\u2011", category: "punctuation" },
    { symbol: "‧", name: "Hyphenation Point", code: "\\u2027", category: "punctuation" },
    { symbol: "′", name: "Prime", code: "\\u2032", category: "punctuation" },
    { symbol: "″", name: "Double Prime", code: "\\u2033", category: "punctuation" },
    { symbol: "‴", name: "Triple Prime", code: "\\u2034", category: "punctuation" },
    { symbol: "⁗", name: "Quadruple Prime", code: "\\u2057", category: "punctuation" },
    { symbol: "‵", name: "Reversed Prime", code: "\\u2035", category: "punctuation" },
    { symbol: "‶", name: "Reversed Double Prime", code: "\\u2036", category: "punctuation" },
    { symbol: "‷", name: "Reversed Triple Prime", code: "\\u2037", category: "punctuation" },
    { symbol: "⁂", name: "Asterism", code: "\\u2042", category: "punctuation" },
    { symbol: "⁓", name: "Swung Dash", code: "\\u2053", category: "punctuation" },
  ],
}

export function getAllCharacters(): Character[] {
  return Object.values(characterCategories).flat()
}
