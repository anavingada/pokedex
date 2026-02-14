import type { PokemonDetails } from '@/types/pokemonDetail'

export async function fetchPokemonDetails(pokemonName: string): Promise<PokemonDetails> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  if (!response.ok) throw new Error('Pokemon not found')
  return response.json()
}
