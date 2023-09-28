<template>
  <input
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
    :value="modelValue"
    :id="id"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="handleInput"
  />
  <slot name="related"></slot>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
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
  }
})
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

