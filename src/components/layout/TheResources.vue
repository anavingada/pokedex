<template>
  <div class="resources">
    <section>
      <h1>{{ $t('resources.title') }}</h1>
    </section>
    <section class="resources__list">
      <article
        v-for="(resource, index) in RESOURCES"
        :key="`resource-${index}`"
        class="resources__list__article"
      >
        <button-link
          :href="resource.link"
          target="_blank"
          rel="noopener"
          class="resources__list__article__link"
        >
          <template #text>
            <span>{{ t(resource.label) }}</span>
          </template>
        </button-link>
      </article>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { RESOURCES } from '@/constants/resources'

import ButtonLink from '@/components/ui/ButtonLink.vue'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.resources {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__list {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;

    &__article {
      &__link {
        color: var(--text-black);

        &:hover {
          color: var(--logo-yellow-shadow);
        }
      }
    }
  }
}
</style>
