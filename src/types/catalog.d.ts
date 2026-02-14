/* Interface representing the search terms for property-based search (not name) */
export interface SearchTerms {
  property: string
  propertyValueId: number
}

export interface PokemonCard {
  name: string
  url: string
}
