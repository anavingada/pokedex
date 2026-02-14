// Pokémon Details related types
export interface LabelValue {
  tag: string
  label: string
  value: string | number
}

export interface DetailListSection {
  title: string
  items: string[]
  ordered?: boolean
}

export interface BaseInfo {
  name: string
  url: string
}

export interface Ability {
  ability: BaseInfo
  is_hidden: boolean
  slot: number
}

export interface Cry {
  latest: string
  legacy: string
}

export interface GameIndex {
  game_index: number
  version: BaseInfo
}

export interface HeldItem {
  item: BaseInfo
  version_details: [
    {
      rarity: number
      version: BaseInfo
    }
  ]
}

export interface Move {
  move: BaseInfo
  version_group_details: [
    {
      level_learned_at: number
      move_learn_method: BaseInfo
      order: number
      version_group: BaseInfo
    }
  ]
}

export interface Stat {
  base_stat: number
  effort: number
  stat: BaseInfo
}

export interface Type {
  slot: number
  type: BaseInfo
}

export interface Sprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface PokemonDetails {
  abilities: Ability[]
  base_experience: number
  cries: Cry[]
  forms: BaseInfo[]
  game_indices: GameIndex[]
  height: number
  held_items: HeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_abilities: [
    {
      abilities: Ability[]
      generation: BaseInfo
    }
  ]
  past_stats: [
    {
      generation: BaseInfo
      stats: Stat[]
    }
  ]
  past_types: [
    {
      generation: BaseInfo
      type: Type
    }
  ]
  species: BaseInfo
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}
