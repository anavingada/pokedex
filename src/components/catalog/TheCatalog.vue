<template>
  <div class="catalog">
    <SearchBy
      @search-name-query="handleSearchByName"
      @search-property-query="handleSearchByProperty"
      @reset-selects="handleReset"
    ></SearchBy>

    <section v-if="isLoading" class="loading">
      <p class="loading__message">Loading Pokédex...</p>
    </section>

    <section v-else>
      <h2>Catalog</h2>

      <p class="catalog__results-number">Number of Pokémons: {{ resultsNumber }}</p>

      <p v-if="filteredPokemons.length === 0" class="catalog__no-results">
        The pokemon you are searching does not exist. Please try again!
      </p>

      <CardsContainer v-else>
        <CatalogCard
          v-for="(pokemon, index) in filteredPokemons"
          :key="index"
          :pokemon="pokemon"
        ></CatalogCard>
      </CardsContainer>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { usePokemonStore } from '@/stores/catalog.store'

import type { SearchTerms } from '@/types/catalog'

import CardsContainer from '@/components/ui/CardsContainer.vue'
import CatalogCard from '@/components/catalog/CatalogCard.vue'
import SearchBy from '@/components/catalog/SearchBy.vue'

const pokemonStore = usePokemonStore()

const isLoading = ref(false)
const isSearching = ref(false)
const searchQuery = ref<SearchTerms | string>('')
const resultsByPropertyValue = ref()

// Computed
const filteredPokemons = computed(() => {
  // If no search is triggered, return the full Pokémon list
  if (!isSearching.value || !searchQuery.value) {
    return pokemonStore.pokemonsList
  }

  // If searching by property, return results filtered by the selected property
  if (typeof pokemonStore.searchQuery === 'object' && pokemonStore.searchQuery !== null) {
    return pokemonStore.pokemonsByPropertyList
  }

  // If searching by name, filter the list based on the Pokémon name
  return filterResultsByName()
})

const resultsNumber = computed(() => {
  return searchQuery.value ? filteredPokemons.value.length : pokemonStore.totalCount
})

// Methods
const fetchPokemons = async () => {
  isLoading.value = true
  await pokemonStore.fetchPokemons()
  isLoading.value = false
}

const handleSearchByName = async (searchNameQuery: string) => {
  searchQuery.value = searchNameQuery
  pokemonStore.searchQuery = searchQuery.value
  isSearching.value = true // Set the search flag to true
}

const handleSearchByProperty = async (searchPropertyQuery: SearchTerms) => {
  searchQuery.value = searchPropertyQuery
  pokemonStore.searchQuery = searchQuery.value
  isSearching.value = true // Set the search flag to true
  isLoading.value = true
  try {
    // Ensure fetchResultsByPropertyValue returns an array or default to empty array
    resultsByPropertyValue.value = await pokemonStore.fetchResultsByPropertyValue(
      searchQuery.value as SearchTerms
    )
  } catch (error) {
    console.error('Failed to fetch results by property:', error)
    resultsByPropertyValue.value = [] // Handle error by setting an empty array
  } finally {
    isLoading.value = false
  }
}

const handleReset = (doReset: Boolean) => {
  if (!doReset) return
  searchQuery.value = ''
  pokemonStore.searchQuery = searchQuery.value
  isSearching.value = true // Set the search flag to true
}

const filterResultsByName = () => {
  if (typeof searchQuery.value === 'string' && searchQuery.value !== null) {
    return pokemonStore.pokemonsList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.value as string)
    )
  }
  return [] // Return an empty array if searchQuery.value is not a string
}

// Lifecycles
onMounted(async () => {
  await fetchPokemons()
})
</script>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  gap: 20px;

  &__results-number {
    font-size: 18px;
    text-align: left;
  }

  &__no-results {
    margin: 40px auto;
    font-size: 18px;
    text-align: center;
  }
}

.loading .message {
  margin: 40px auto;
  font-size: 18px;
  text-align: center;
}
</style>
