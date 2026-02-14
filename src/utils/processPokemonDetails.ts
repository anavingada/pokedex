export { isEmpty } from '@/utils/isEmpty'

import type { PokemonDetails, Type, Sprites, HeldItem, Move, Ability } from '@/types/pokemonDetail'
import { isEmpty } from './isEmpty'

export function processPokemonDetails(pokemon: PokemonDetails | null) {
  if (!pokemon) return null

  const types = extractPokemonTypes(pokemon.types)

  const images = extractPokemonImages(pokemon.sprites)

  const heldItems = extractPokemonHeldItems(pokemon.held_items)

  const moves = extractPokemonMoves(pokemon.moves)

  const { hiddenAbilities, nonHiddenAbilities } = extractPokemonAbilities(pokemon.abilities)

  const basicInfo = extractPokemonBasicInfo(pokemon, types, heldItems)

  // Returns an object containing all the processed Pokémon data
  return {
    types,
    images,
    heldItems,
    moves,
    hiddenAbilities,
    nonHiddenAbilities,
    basicInfo
  }
}

function extractPokemonTypes(types: Type[]) {
  return types.map((types) => types.type.name).join(', ')
}

function extractPokemonImages(sprites: Sprites) {
  return Object.values(sprites).filter((item) => typeof item === 'string')
}

function extractPokemonHeldItems(heldItems: HeldItem[]) {
  return heldItems.map((heldItem) => heldItem.item.name).join(', ')
}

function extractPokemonMoves(moves: Move[]) {
  return moves.map((moves) => moves.move.name)
}

function extractPokemonAbilities(abilities: Ability[]) {
  const hiddenAbilities: string[] = []
  const nonHiddenAbilities: string[] = []

  abilities.forEach(({ is_hidden, ability }) => {
    if (is_hidden) hiddenAbilities.push(ability.name)
    else nonHiddenAbilities.push(ability.name)
  })

  return { hiddenAbilities, nonHiddenAbilities }
}

function extractPokemonBasicInfo(pokemon: PokemonDetails, types: string, heldItems: string) {
  const rawInfo = [
    { tag: 'name', label: 'pokemonDetail.name', value: pokemon.name },
    { tag: 'id', label: 'pokemonDetail.id', value: pokemon.id },
    { tag: 'order', label: 'pokemonDetail.order', value: pokemon.order },
    { tag: 'weight', label: 'pokemonDetail.weight', value: pokemon.weight },
    { tag: 'height', label: 'pokemonDetail.height', value: pokemon.height },
    {
      tag: 'baseExperience',
      label: 'pokemonDetail.baseExperience',
      value: pokemon.base_experience
    },
    { tag: 'types', label: 'pokemonDetail.types', value: types },
    { tag: 'heldItems', label: 'pokemonDetail.heldItems', value: heldItems }
  ]

  const basicInfo = rawInfo.map((entry) => ({
    tag: entry.tag,
    label: entry.label,
    value: isEmpty(entry.value) ? 'pokemonDetail.unknown' : entry.value
  }))

  return basicInfo
}
