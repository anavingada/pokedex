<template>
  <TheNavbar />
  <main class="main">
    <NotFound />
  </main>
  <TheFooter />
</template>

<script lang="ts" setup>
import TheNavbar from '@/components/layout/TheNavbar.vue'
import NotFound from '@/components/error/NotFound.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
</script>
