<template>
  <input
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
    :class="hasBoxShadow"
    :id="id"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    v-model="inputValue"
    @blur="emit('inputBlur')"
  />
  <slot name="related"></slot>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useVModel } from "@vueuse/core"

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ""
  },
  autocomplete: {
    type: String,
    default: "on"
  },
  boxShadow: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["update:modelValue", "inputBlur"])
const inputValue = useVModel(props, "modelValue", emit)

const hasBoxShadow = computed(() => {
  return props.boxShadow
    ? "rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
    : ""
})
</script>
