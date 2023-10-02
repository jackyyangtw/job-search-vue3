<template>
  <div class="mt-2 relative">
    <!-- <input 
      type="text" 
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="San Francisco, London, Michigan" 
      v-model.lazy="locationSearchTerm"
    > -->
    <LocationInput :location="locationSearchTerm" :relatedLocationRefPos="relatedLocationRefPos" :height="elementHeight" :showRelatedLocation="showRelatedLocation" :setLocation="setLocation" :filered_UNIQUE_LOCATIONS="filered_UNIQUE_LOCATIONS" v-model.lazy="locationSearchTerm" ref="locationInputRef" boxShadow></LocationInput>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useUserStore } from '@/stores/user';
import LocationInput from '@/components/Shared/LocationInput.vue';
import { useRelatedLocation } from '@/composables/useRelatedLocation';
const userStore = useUserStore();

const locationSearchTerm = computed({
  get: () => userStore.locationSearchTerm,
  set: (value) => userStore.UPDATE_LOCATION_SEARCH_TERM(value),
});

const locationInputRef = ref<HTMLElement|null>(null)
const { relatedLocationRefPos, showRelatedLocation, setLocation, elementHeight, filered_UNIQUE_LOCATIONS } = useRelatedLocation(locationInputRef as Ref<HTMLElement>, locationSearchTerm)


</script>

