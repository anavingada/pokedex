<template>
  <header class="header">
    <button-link to="/">
      <template #image>
        <TheImage
          :data="{
            alt: $t('images.pokemonLogo'),
            source: pokemonLogo
          }"
          class="header__logo"
        />
      </template>
    </button-link>
    <h1 class="header__title">{{ $t('catalog.title') }}</h1>
  </header>
</template>

<script lang="ts" setup>
import pokemonLogo from '@/assets/images/pokemon-logo.svg'

import ButtonLink from '@/components/ui/ButtonLink.vue'
import TheImage from '@/components/ui/TheImage.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 40px;
  gap: 32px;

  &__logo {
    width: 100%;
    max-width: 350px;
  }

  &__title {
    color: var(--logo-dark-blue);
    font-size: 32px;
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
