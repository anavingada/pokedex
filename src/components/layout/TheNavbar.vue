<template>
  <section class="nav-wrapper">
    <Transition name="nav-slide">
      <nav v-if="showNav" class="nav">
        <button-link to="/">
          <template #image>
            <img
              :alt="$t('images.pokemonLogo')"
              class="logo"
              src="@/assets/images/pokemon-logo.svg"
            />
          </template>
        </button-link>
      </nav>
    </Transition>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ButtonLink from '@/components/ui/ButtonLink.vue'

const props = defineProps<{
  animated?: boolean
}>()

const showNav = ref(!props.animated)
const THRESHOLD = 150

function onScroll() {
  showNav.value = window.scrollY > THRESHOLD
}

onMounted(() => {
  if (props.animated) window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  if (props.animated) window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 100px;
  background: #b3a125;
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
}

.logo {
  width: 100%;
  max-width: 120px;
}

/* Vue transition */
.nav-slide-enter-active,
.nav-slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.nav-slide-enter-from,
.nav-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
