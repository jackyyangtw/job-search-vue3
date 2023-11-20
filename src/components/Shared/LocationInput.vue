<template>
  <TextInput
    id="location"
    autocomplete="off"
    v-model="inputValue"
    :boxShadow="boxShadow"
    placeholder="San Francisco, London, Michigan"
    @clearInput="emit('clearInput')"
  >
    <template #related>
      <transition name="fade">
        <div
          class="bg-white w-full max-h-[300px] absolute shadow-md"
          :class="{ 'overflow-y-scroll': height >= 300 }"
          :style="relatedLocationRefPos"
          ref="relatedLoactionRef"
          v-show="location && showRelatedLocation"
        >
          <ul>
            <li
              @click="emit('setLocation', LOCATION)"
              class="px-3 py-2 cursor-pointer hover:bg-brand-gray-1/[0.3]"
              v-for="LOCATION in filered_UNIQUE_LOCATIONS"
              :key="LOCATION"
            >
              {{ LOCATION }}
            </li>
          </ul>
        </div>
      </transition>
    </template>
  </TextInput>
</template>

<script setup lang="ts">
import TextInput from "./TextInput.vue"
import { ref, type PropType } from "vue"
import { useVModel } from "@vueuse/core"
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  relatedLocationRefPos: {
    type: Object,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  showRelatedLocation: {
    type: Boolean,
    required: true
  },
  filered_UNIQUE_LOCATIONS: {
    type: Array as PropType<string[]>,
    required: true
  },
  boxShadow: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:modelValue", "clearInput", "setLocation"])
const inputValue = useVModel(props, "modelValue", emit)
const relatedLoactionRef = ref(null)

defineExpose({
  relatedLoactionRef
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
