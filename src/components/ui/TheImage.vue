<template>
  <img :alt="props.data.alt" :src="pokemonImage" @error="onImageError" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { setPokemonImage, onImageError } from '@/utils/pokemonImage'

import DEFAULT_POKEMON_IMAGE from '@/assets/images/unknown-pokemon.png'

const props = defineProps<{
  data: { id?: string | number; alt: string; source?: string }
}>()

// Computed
const pokemonImage = computed<string>((): string => {
  console.log(props.data.source)
  if (props.data.source) return props.data.source
  else if (props.data.id) return setPokemonImage(props.data.id)
  else return DEFAULT_POKEMON_IMAGE
})
</script>
