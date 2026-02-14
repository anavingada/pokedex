import { defineStore } from 'pinia'

import { fetchPokemonDetails } from '@/services/pokemonDetail.service'

import type { PokemonDetails } from '@/types/pokemonDetail'

export const usePokemonDetailStore = defineStore('pokemonDetailStore', {
  // The state function returns the initial state of the store
  state: () => ({
    pokemonDetails: null as PokemonDetails | null
  }),
  actions: {
    async loadPokemonDetail(pokemonName: string) {
      try {
        this.pokemonDetails = await fetchPokemonDetails(pokemonName)
      } catch (err) {
        this.pokemonDetails = null
        throw err
      }
    }
  }
})
