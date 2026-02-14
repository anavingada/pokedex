<template>
  <img
    :alt="`Image of pokémon ${formattedPokemonName}`"
    :src="pokemonImage"
    @error="onImageError"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { formatPokemonName } from '@/utils/pokemonName'
import { setPokemonImage, onImageError } from '@/utils/pokemonImage'

const props = defineProps<{
  data: { name: string; id: string | number }
}>()

// Computed
const pokemonImage = computed<string>(() => {
  return setPokemonImage(props.data.id)
})

const formattedPokemonName = computed<string>(() => {
  return formatPokemonName(props.data.name)
})
</script>
