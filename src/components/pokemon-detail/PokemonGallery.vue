<template>
  <section class="pokemon-gallery">
    <h4>{{ $t('pokemonDetail.gallery') }}:</h4>
    <div class="pokemon-gallery__items">
      <TheImage
        v-for="(image, index) in images"
        :key="index"
        :data="{
          alt: `${formatPokemonName(pokemonName)} image ${index + 1}`,
          source: image
        }"
        class="pokemon-gallery__items__image"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { formatPokemonName } from '@/utils/pokemonName'

import TheImage from '@/components/ui/TheImage.vue'

defineProps<{
  pokemonName: string
  images: string[]
}>()
</script>

<style lang="scss" scoped>
.pokemon-gallery {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;

  &__items {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @include size-s-up {
      grid-template-columns: repeat(2, 1fr);
    }

    @include size-m-up {
      grid-template-columns: repeat(4, 1fr);
    }

    &__image {
      width: 100%;
      padding: 10px;
      aspect-ratio: 1/1;
    }
  }
}
</style>
