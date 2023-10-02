<template>
  <TextInput id="location" placeholder="Los Angeles" autocomplete="off" :modelValue="props.location" @update:modelValue="updateValue" :boxShadow="boxShadow">
    <template #related>
      <transition name="fade">          
        <div class="bg-white w-full max-h-[300px] absolute shadow-md"
          :class="{'overflow-y-scroll': props.height >= 300}"
          :style="props.relatedLocationRefPos"
          ref="relatedLoactionRef"
          v-show="props.location && props.showRelatedLocation"
        >
          <ul>
            <li @click="setLocation(LOCATION)" class="px-3 py-2 cursor-pointer hover:bg-brand-gray-1/[0.3]" v-for="LOCATION in props.filered_UNIQUE_LOCATIONS" :key="(LOCATION as string)">{{ LOCATION }}</li>
          </ul>
        </div>
      </transition>
    </template>
  </TextInput>
</template>

<script setup lang="ts">
import TextInput from './TextInput.vue';
import { ref } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  modelModifiers: {
    default: () => ({})
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
  setLocation: {
    type: Function,
    required: true
  },
  filered_UNIQUE_LOCATIONS: {
    type: Array,
    required: true
  },
  boxShadow: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
const relatedLoactionRef = ref(null)

defineExpose({
  relatedLoactionRef
})

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>