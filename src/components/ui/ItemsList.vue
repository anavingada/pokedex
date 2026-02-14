<template>
  <component :is="ordered ? 'ol' : 'ul'" :class="{ list: true, 'list--ordered': ordered }">
    <li v-for="(item, index) in list" :key="index" class="list__item">{{ item }}</li>
  </component>
</template>

<script lang="ts" setup>
const props = defineProps<{
  list: string[]
  ordered?: boolean
}>()

const ordered = props.ordered ?? false
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  &--ordered {
    display: block;
    column-count: 1;

    @include size-m-up {
      column-count: 2;
    }

    @include size-l-up {
      column-count: 3;
    }

    @include size-xl-up {
      column-count: 4;
    }
  }

  &__item {
    color: var(--text-black);
    font-size: 16px;
  }
}
</style>
