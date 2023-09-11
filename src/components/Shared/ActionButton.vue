<template>
  <button :class="btnClasses">
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Sign in'
  },
  type: {
    type: String,
    default: 'primary'
  }
})
const btnClasses = computed(() => {
  return {
    [props.type]: true
  }
})
</script>

<style scoped lang="postcss">
button {
  @apply px-5 py-3;
}
.primary {
  @apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}
.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
