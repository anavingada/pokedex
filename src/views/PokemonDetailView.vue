<template>
  <TheNavbar />
  <main class="main">
    <div v-if="pokemonFilteredDetails" class="container">
      <PokemonBasicInfo :pokemon-basic-info="pokemonFilteredDetails.basicInfo"></PokemonBasicInfo>
      <PokemonDetailList
        v-if="pokemonFilteredDetails.moves.length > 0"
        :detail-list-section="[
          {
            title: $t('pokemonDetail.moves'),
            items: pokemonFilteredDetails.moves,
            ordered: true
          }
        ]"
      ></PokemonDetailList>
      <PokemonDetailList
        v-if="
          pokemonFilteredDetails.nonHiddenAbilities.length > 0 ||
          pokemonFilteredDetails.hiddenAbilities.length > 0
        "
        :detail-list-section="[
          {
            title: $t('pokemonDetail.nonHiddenAbilities'),
            items: pokemonFilteredDetails.nonHiddenAbilities
          },
          {
            title: $t('pokemonDetail.hiddenAbilities'),
            items: pokemonFilteredDetails.hiddenAbilities
          }
        ]"
      ></PokemonDetailList>
      <PokemonGallery
        v-if="pokemonFilteredDetails.images.length > 0"
        :pokemon-name="pokemonDetailStore.pokemonDetails!.name"
        :images="pokemonFilteredDetails.images"
      ></PokemonGallery>
    </div>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonDetailStore } from '@/stores/pokemonDetail.store'
import { processPokemonDetails } from '@/utils/processPokemonDetails'

import TheNavbar from '@/components/layout/TheNavbar.vue'
import PokemonBasicInfo from '@/components/pokemon-detail/PokemonBasicInfo.vue'
import PokemonDetailList from '@/components/pokemon-detail/PokemonDetailList.vue'
import PokemonGallery from '@/components/pokemon-detail/PokemonGallery.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

// Getting the current route and router instances
const route = useRoute()
const router = useRouter()
const pokemonDetailStore = usePokemonDetailStore()

// Computed property to process the fetched Pokémon data
const pokemonFilteredDetails = computed(() =>
  processPokemonDetails(pokemonDetailStore.pokemonDetails)
)

// Fetch the Pokémon data when the component is about to be mounted
onBeforeMount(async () => {
  try {
    const pokemonName = route.params.pokemonName as string
    await pokemonDetailStore.loadPokemonDetail(pokemonName)
  } catch {
    router.push({ name: 'view-error' })
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 32px;
}
</style>
