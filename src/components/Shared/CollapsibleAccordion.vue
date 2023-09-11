<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      role="button"
      class="flex cursor-pointer flex-wrap items-center justify-between"
      @click="toggleAccordion"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen">
      <slot>Whoops, somebody forgot to populate me!</slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  header: {
    type: String,
    required: true
  }
})

const isOpen = ref(false)
const caretIcon = computed(() => {
  return isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']
})
const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

