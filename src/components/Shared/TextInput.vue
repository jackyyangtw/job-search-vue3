<template>
  <input
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
    :class="hasBoxShadow"
    :value="modelValue"
    :id="id"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="handleInput"
  />
  <slot name="related"></slot>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  modelModifiers: {
    default: () => ({})
  },
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: 'on'
  },
  boxShadow: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'inputBlur','inputFocus', 'inputChange'])

const handleInput = (event: Event) => {
  // console.log(props.modelModifiers.lazy)
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  // if(props.modelModifiers.lazy) {
  // }
}
const hasBoxShadow = computed(() => {
  return props.boxShadow ? 'rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray' : ''
})

</script>

