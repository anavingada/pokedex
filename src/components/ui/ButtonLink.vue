<template>
  <component :is="component" v-bind="componentProps" class="cta">
    <slot name="image"></slot>
    <slot name="text"></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  to?: string
  href?: string
}>()

const component = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const componentProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href)
    return {
      href: props.href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  return {}
})
</script>
