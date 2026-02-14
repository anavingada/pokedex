<!-- NOTES

This component allows to search by name or other properties, passing the information to the parent component. 
It allows resetting the values.  -->

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { usePokemonStore } from '@/stores/catalog.store'

export default defineComponent({
  name: 'SearchBy',

  setup(props, { emit }) {
    const pokemonStore = usePokemonStore()
    const searchQuery = ref()

    // Property Options available
    const options = ref([
      { value: 'name', label: 'Name' },
      { value: 'ability', label: 'Ability' },
      { value: 'move', label: 'Move' },
      { value: 'type', label: 'Type' }
    ])

    // Emit search event when user types and clicks search
    const emitSearchQuery = () => {
      emit('search-name-query', searchQuery.value)
    }

    const selectedProperty = ref('')
    const selectedPropertyValue = ref('')
    const isLoading = ref(false)
    const results = ref<{ value: string; label: string }[]>([])

    // Watch the selected property and fetch results when it changes
    watch(selectedProperty, async (newProperty) => {
      if (newProperty) {
        await fetchResults(newProperty)
      } else {
        emit('resetSelects', true)
      }
    })

    // Watch the selected property value and emit the search event
    watch(selectedPropertyValue, async (newPropertyValue) => {
      if (newPropertyValue) {
        const selectedPropertyId = parseInt(newPropertyValue.split('/')[6])
        emit('search-property-query', {
          property: selectedProperty.value,
          propertyValueId: selectedPropertyId
        })
      } else {
        emit('resetSelects', true)
      }
    })

    // Fetch results options based on the selected property
    const fetchResults = async (property: string) => {
      isLoading.value = true
      try {
        if (property === 'name') return
        const fetchedResults = await pokemonStore.fetchPropertyResults(property)
        results.value = fetchedResults.map((result: { url: string; name: string }) => ({
          value: result.url,
          label: result.name
        }))
        selectedPropertyValue.value = '' // Reset the selected result
      } catch (error) {
        console.error('Failed to fetch results:', error)
      } finally {
        isLoading.value = false
      }
    }

    // Reset function to clear selections
    const resetSelections = () => {
      searchQuery.value = ''
      selectedProperty.value = ''
      selectedPropertyValue.value = ''
      results.value = []
    }

    return {
      searchQuery,
      emitSearchQuery,
      options,
      selectedProperty,
      selectedPropertyValue,
      isLoading,
      results,
      resetSelections
    }
  }
})
</script>

<template>
  <section class="search-by">
    <h2>Search Pokémons</h2>
    <div class="search-by__actions">
      <div class="search-by__actions__property">
        <label for="property-select" class="search-by__actions__property__label">
          Select Property:
        </label>
        <select
          id="property-select"
          v-model="selectedProperty"
          class="search-by__actions__property__select"
        >
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div v-if="selectedProperty === 'name'" class="search-by__actions__name-input">
        <label for="results-select" class="search-by__actions__name-input__label">
          Write the name of the pokemon:
        </label>
        <div class="search-by__actions__name-input__search">
          <input
            v-model="searchQuery"
            placeholder="Search Pokémon"
            class="search-by__actions__name-input__search__input"
          />
          <button class="search-by__actions__name-input__search__btn" @click="emitSearchQuery">
            Search
          </button>
        </div>
      </div>

      <div v-else class="search-by__actions__option-select">
        <!-- Second select for displaying fetched results -->
        <label for="results-select" class="search-by__actions__option-select__label">
          Select Result:
        </label>
        <select
          id="results-select"
          v-model="selectedPropertyValue"
          :disabled="isLoading"
          class="search-by__actions__option-select__select"
        >
          <option v-for="result in results" :key="result.value" :value="result.value">
            {{ result.label }}
          </option>
        </select>
      </div>
    </div>
    <button class="search-by__actions__reset" @click="resetSelections">Reset</button>
  </section>
</template>

<style lang="scss" scoped>
.search-by {
  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 32px;

    @include size-m-up {
      flex-direction: row;
    }

    &__property {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 12px;

      &__label {
        color: var(--text-black);
        font-size: 18px;
      }

      &__select {
        padding: 6px 12px;
      }
    }

    &__name-input {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 12px;

      &__label {
        color: var(--text-black);
        font-size: 18px;
      }

      &__search {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 400px;
        gap: 12px;

        &__input {
          width: 100%;
          padding: 6px 12px;
        }

        &__btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6px 12px;
          border: 1px solid var(--logo-yellow-shadow);
          border-radius: 6px;
          background-color: var(--logo-yellow-shadow);
          color: var(--text-black);

          &:hover {
            background-color: var(--logo-yellow);
            cursor: pointer;
          }
        }
      }
    }

    &__option-select {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      gap: 12px;

      &__label {
        color: var(--text-black);
        font-size: 18px;
      }

      &__select {
        padding: 6px 12px;
      }
    }

    &__reset {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px auto;
      padding: 12px 24px;
      border: 1px solid var(--logo-yellow-shadow);
      border-radius: 6px;
      background-color: var(--logo-yellow-shadow);
      color: var(--text-black);

      &:hover {
        background-color: var(--logo-yellow);
        cursor: pointer;
      }
    }
  }
}
</style>
