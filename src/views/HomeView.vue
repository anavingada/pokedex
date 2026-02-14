<template>
  <TheNavbar animated />
  <TheHeader />
  <main class="main">
    <TheCatalog />
  </main>
  <TheFooter />
</template>

<script lang="ts" setup>
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheCatalog from '@/components/catalog/TheCatalog.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
</script>
