<template>
  <footer class="footer">
    <section class="footer__section">
      <div class="footer__section__project">
        <TheImage
          :data="{
            alt: $t('images.pokeball'),
            source: pokeballImage
          }"
          class="footer__section__project__logo"
        />
        <p class="footer__section__project__name">{{ $t('footer.projectName') }}</p>
      </div>
      <button-link to="/resources" class="footer__section__resources">
        <template #text>
          <span>{{ $t('cta.resources') }}</span>
        </template>
      </button-link>
    </section>
  </footer>
</template>

<script lang="ts" setup>
import pokeballImage from '@/assets/images/pokeball.png'

import ButtonLink from '@/components/ui/ButtonLink.vue'
import TheImage from '@/components/ui/TheImage.vue'
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background: #b3a125;

  &__section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    margin: 24px auto;
    gap: 12px;

    &__project {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;

      &__logo {
        width: 20px;
        height: 20px;
      }

      &__name {
        color: var(--text-black);
        font-size: 12px;
      }
    }

    &__resources {
      color: var(--text-black);
      font-size: 12px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
