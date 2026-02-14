<template>
  <article class="catalog-card" @click="goToPokemonDetailPage()">
    <TheImage
      :data="{
        alt: `Image of pokémon ${formatPokemonName(props.pokemon.name)}`,
        id: pokemonId
      }"
      class="catalog-card__image"
    />
    <div class="catalog-card__background">
      <p class="catalog-card__background__text">{{ formattedPokemonName }}</p>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePokemonStore } from '@/stores/catalog.store'
import { useRouter } from 'vue-router'

import { formatPokemonName } from '@/utils/pokemonName'

import type { PokemonCard } from '@/types/catalog'

import TheImage from '@/components/ui/TheImage.vue'

const props = defineProps<{
  pokemon: PokemonCard
}>()

const pokemonStore = usePokemonStore()
const router = useRouter()

// Computed
const pokemonId = computed<string>((): string => {
  return props.pokemon.url.split('/')[6]!
})

const formattedPokemonName = computed<string>((): string => {
  return formatPokemonName(props.pokemon.name)
})

// Methods
const goToPokemonDetailPage = () => {
  const pokemonName: string = props.pokemon.name
  pokemonStore.setSelectedPokemonId(pokemonId.value)
  router.push({ name: 'view-pokemon-detail', params: { pokemonName } })
}
</script>

<style lang="scss" scoped>
.catalog-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--logo-yellow-shadow);
  border-radius: 6px;
  cursor: pointer;
  gap: 12px;

  &:hover {
    box-shadow:
      0 5px 5px 0 var(--logo-yellow-shadow),
      0 2.5px 5px 0 var(--logo-yellow);
  }

  &__image {
    width: 100%;
    aspect-ratio: 1/1;
  }

  &__background {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 6px 12px;
    border-radius: 0 0 4px 4px;
    background: var(--logo-yellow-shadow);

    &__text {
      color: var(--text-black);
      font-size: 16px;
      text-align: center;
      text-transform: capitalize;
    }
  }
}
</style>
