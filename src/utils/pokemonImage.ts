import DEFAULT_POKEMON_IMAGE from '@/assets/images/unknown-pokemon.png'

export function setPokemonImage(pokemonId: string | number): string {
  console.log('setpokemonimage')
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
  return url
}

export function onImageError(event: Event) {
  console.log('function on imageerrr')
  const img = event.target as HTMLImageElement
  if (img.src !== DEFAULT_POKEMON_IMAGE) {
    img.src = DEFAULT_POKEMON_IMAGE
  }
  img.removeEventListener('error', onImageError)
}
