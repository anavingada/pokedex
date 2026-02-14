<template>
  <section class="pokemon-detail-list">
    <template v-for="(section, index) in detailListSection" :key="`detail-list-section-${index}`">
      <template v-if="section.items.length > 0">
        <h4>{{ section.title }}</h4>
        <ItemsList :list="section.items" :ordered="section.ordered" />
      </template>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { DetailListSection } from '@/types/pokemonDetail'

import ItemsList from '@/components/ui/ItemsList.vue'

defineProps<{
  detailListSection: DetailListSection[]
}>()
</script>

<style lang="scss" scoped>
.pokemon-detail-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
}
</style>
