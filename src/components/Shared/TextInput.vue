<template>
  <input
    type="text"
    class="w-full text-lg font-normal focus:outline-none relative"
    :class="hasBoxShadow"
    :id="id"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :value="modelValue"
    @change="onChange"
    @input="onInput"
    v-bind="$attrs"
  />
  <transition name="fade-in">
    <div
      @click="emit('clearInput')"
      class="absolute right-1 top-1 cursor-pointer text-brand-blue-1 bg:white w-[45px] h-[45px] bg-white flex items-center justify-center rounded-full"
      v-if="modelValue"
      >
      <font-awesome-icon
        :icon="['fas', 'circle-xmark']"
      />
    </div>
  </transition>
  <slot name="related"></slot>
</template>

<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
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
const emit = defineEmits(["update:modelValue", "clearInput", "inputBlur", "enterKey"])

// input gains values
const onInput = (e: Event) => {
  if (!props.modelModifiers.lazy) {
    emit("update:modelValue", (e.target as HTMLInputElement).value)
  }
}

// input loses focus
const onChange = (e: Event) => {
  if (props.modelModifiers.lazy) {
    emit("update:modelValue", (e.target as HTMLInputElement).value)
  }
}

const hasBoxShadow = computed(() => {
  return props.boxShadow
    ? "rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
    : ""
})
</script>

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.2s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

</style>
