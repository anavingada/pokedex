<template>
  <div class="not-found">
    <section class="not-found__section--error">
      <div class="not-found__section--error__info">
        <h1>
          <span>4</span>
          <img :alt="$t('images.emptyPokeball')" src="@/assets/images/empty-pokeball.png" />
          <span>4</span>
        </h1>
        <div class="oval"></div>
      </div>
      <h2>{{ $t('error.oops') }}</h2>
    </section>

    <section class="not-found__section--message">
      <p>{{ $t('error.pokemonNotFound') }}</p>
      <div>
        <button-link to="/" class="button">
          <template #text>
            <span>{{ $t('cta.exploreCatalog') }}</span>
          </template>
        </button-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ButtonLink from '@/components/ui/ButtonLink.vue'
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;

  &__section {
    &--error {
      display: flex;
      flex-direction: column-reverse;
      gap: 25px;

      &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        h1 {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: auto;
          gap: 50px;

          span {
            color: #222224;
            font-size: 200px;
            line-height: 1;
          }

          img {
            width: 200px;
            height: auto;
          }
        }
      }

      .oval {
        width: 100%;
        max-width: 520px;
        height: 45px;
        margin: 12px 0;
        border-radius: 50%;
        background-color: #f0f0f0;
      }

      h2 {
        color: #222224;
        letter-spacing: 8px;
      }
    }

    &--message {
      display: flex;
      flex-direction: column;
      gap: 25px;

      p {
        font-size: 20px;
      }

      .button {
        display: inline-block;
        align-items: center;
        padding: 12px;
        border-radius: 4px;
        background-color: #ee1515;
        color: #fff;

        &:hover {
          background-color: #980b0b;
        }
      }
    }
  }
}
</style>
