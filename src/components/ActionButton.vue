<template>
  <button :class="btnClasses">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    text: {
      type: String,
      default: 'Sign in'
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    btnClasses() {
      return {
        [this.type]: true
      }
    }
  }
}
</script>

<style scoped lang="postcss">
button {
  @apply rounded px-5 py-3;
}
.primary {
  @apply border-0 bg-brand-blue-1 text-white hover:shadow-blue;
}
.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
