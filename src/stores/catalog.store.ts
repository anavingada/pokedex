import { defineStore } from 'pinia'

// Defines the shape of each Pokémon object, allowing dynamic properties with `[key: string]: any`
export interface Pokemon {
  name: string
  url: string
  [key: string]: any // This allows for dynamic property access
}

// Defines the structure for search terms when searching by property.
export interface SearchTerms {
  property: string
  propertyValueId: number
}

// Defines the structure of the store's state.
// The state is typed with PokemonState to ensure strict type-checking for the state values.
interface PokemonState {
  pokemonsList: Pokemon[]
  pokemonsByPropertyList: Pokemon[]
  selectedPokemonId: string
  searchQuery: string | SearchTerms
  isFetched: boolean
  totalCount: number
}

// Define a Pinia store to manage the state of Pokémon data
export const usePokemonStore = defineStore('pokemon', {
  // The state function returns the initial state of the store
  state: (): PokemonState => ({
    pokemonsList: [],
    pokemonsByPropertyList: [],
    selectedPokemonId: '',
    searchQuery: '',
    isFetched: false,
    totalCount: 0
  }),
  actions: {
    // Fetches the list of Pokémon from the API.
    async fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
        const data = await response.json()
        this.pokemonsList = data.results
        this.totalCount = data.count
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      }
    },
    // Sets the ID of the currently selected Pokémon.
    setSelectedPokemonId(id: string) {
      this.selectedPokemonId = id
    },
    // Fetches results for a specific property (e.g., types, abilities, moves).
    async fetchPropertyResults(property: string = '') {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/${property}?limit=10000`)
        const data = await response.json()
        return data.results
      } catch (error) {
        console.error('Error fetching results:', error)
        throw error
      }
    },

    // Fetches Pokémon by a specific property value (ability, move, type).
    async fetchResultsByPropertyValue(searchTerms: SearchTerms) {
      try {
        if (searchTerms.property === 'ability') {
          return this.fetchResultsByAbility(searchTerms.propertyValueId)
        } else if (searchTerms.property === 'move') {
          return this.fetchResultsByMove(searchTerms.propertyValueId)
        } else if (searchTerms.property === 'type') {
          return this.fetchResultsByType(searchTerms.propertyValueId)
        } else {
          return []
        }
      } catch (error) {
        console.error('Error fetching results:', error)
        return []
      }
    },
    // Fetches Pokémon by ability ID.
    async fetchResultsByAbility(valueId: number = 0) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${valueId}?limit=10000`)
        const data = await response.json()
        const temporaryArray: { name: string; url: string }[] = []
        data.pokemon.forEach((pokemon: { pokemon: { name: string; url: string } }) => {
          temporaryArray.push(pokemon.pokemon)
        })
        this.pokemonsByPropertyList = temporaryArray
      } catch (error) {
        console.error('Error fetching results:', error)
        return []
      }
    },
    // Fetches Pokémon by move ID.
    async fetchResultsByMove(valueId: number = 0) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${valueId}?limit=10000`)
        const data = await response.json()
        this.pokemonsByPropertyList = data.learned_by_pokemon
      } catch (error) {
        console.error('Error fetching results:', error)
        return []
      }
    },
    // Fetches Pokémon by type ID.
    async fetchResultsByType(valueId: number = 0) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${valueId}?limit=10000`)
        const data = await response.json()
        const temporaryArray: { name: string; url: string }[] = []
        data.pokemon.forEach((pokemon: { pokemon: { name: string; url: string } }) => {
          temporaryArray.push(pokemon.pokemon)
        })
        this.pokemonsByPropertyList = temporaryArray
      } catch (error) {
        console.error('Error fetching results:', error)
        return []
      }
    }
  }
})
