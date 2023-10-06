<template>
  <div class="border-b border-solid border-brand-gray-1 py-5">
    <div
      role="button"
      class="flex cursor-pointer flex-wrap items-center justify-between"
      @click="toggleAccordion"
    >
      <h3 class="text-base font-semibold">{{ props.header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-show="isOpen || props.shouldOpenInitially">
      <slot>Whoops, somebody forgot to populate me!</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
// import { useRoute } from "vue-router"

const props = defineProps({
  header: {
    type: String,
    required: true
  },
  shouldOpenInitially: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)

const caretIcon = computed(() => {
  return isOpen.value || props.shouldOpenInitially ? ["fas", "angle-up"] : ["fas", "angle-down"]
})

const emit = defineEmits(["toggleAccordion"])
const toggleAccordion = () => {
  isOpen.value = !isOpen.value
  emit("toggleAccordion", isOpen.value)
}
</script>
