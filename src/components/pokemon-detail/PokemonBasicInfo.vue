<template>
  <section class="pokemon-basic-info">
    <!-- Image -->
    <div class="pokemon-basic-info__subsection--image">
      <TheImage
        :data="{
          name: pokemonName,
          id: pokemonId
        }"
        class="pokemon-basic-info__subsection--image__image"
      />
    </div>
    <!-- Info -->
    <div class="pokemon-basic-info__subsection">
      <component
        :is="setHeadingTag(info.tag)"
        v-for="info in pokemonBasicInfo"
        :key="info.tag"
        class="pokemon-basic-info__subsection__heading"
      >
        {{ t(info.label) }}:
        <span v-if="info.tag === 'name'" class="pokemon-basic-info__subsection__heading__value">
          {{ formatPokemonName(pokemonName) }}
        </span>
        <span v-else class="pokemon-basic-info__subsection__heading__value">
          {{ t(info.value) }}
        </span>
      </component>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { formatPokemonName } from '@/utils/pokemonName'

import type { LabelValue } from '@/types/pokemonDetail'

import TheImage from '@/components/ui/TheImage.vue'

const { t } = useI18n()

const props = defineProps<{
  pokemonBasicInfo: LabelValue[]
}>()

// Computed
const pokemonName = computed<string>((): string => {
  const name = findByTag('name')
  return typeof name === 'string' ? name : String(name ?? '')
})

const pokemonId = computed<number>((): number => {
  const pokemonId = findByTag('id')
  return pokemonId as number
})

// Methods
const findByTag = (tag: string): string | number => {
  const match = props.pokemonBasicInfo.find((item) => item.tag === tag)
  return match?.value ?? 'pokemonDetail.unknown'
}

const setHeadingTag = (tag: string) => {
  switch (tag) {
    case 'name':
      return 'h1'
    case 'id':
    case 'order':
      return 'h2'
    default:
      return 'h3'
  }
}
</script>

<style lang="scss" scoped>
.pokemon-basic-info {
  display: grid;
  align-items: center;
  width: 100%;
  gap: 32px;
  grid-template-columns: 1fr;

  @include size-m-up {
    grid-template-columns: 1fr 1fr;
  }

  @include size-l-up {
    grid-template-columns: 1fr 2fr;
  }

  &__subsection {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 12px;

    &__heading {
      &__value {
        color: var(--text-black);
        text-transform: capitalize;
      }
    }

    &--image {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__image {
        width: 100%;
        max-width: 350px;
        aspect-ratio: 1 / 1;
      }
    }

    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 20px;
    }
  }
}
</style>
