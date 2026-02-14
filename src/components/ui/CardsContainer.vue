<template>
  <div class="cards-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.cards-container {
  display: grid;
  margin: 20px auto;
  gap: 32px;
  grid-template-columns: 1fr;

  @include size-s-up {
    grid-template-columns: repeat(2, 1fr);
  }

  @include size-l-up {
    grid-template-columns: repeat(4, 1fr);
  }

  @include size-xl-up {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
