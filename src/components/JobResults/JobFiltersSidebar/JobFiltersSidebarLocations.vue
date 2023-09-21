<template>
  <div class="mt-2">
    <input 
      type="text" 
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="San Francisco, London, Michigan" 
      v-model.lazy.trim="locationSearchTerm"
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const locationSearchTerm = computed({
  get: () => userStore.locationSearchTerm,
  set: (value) => userStore.UPDATE_LOCATION_SEARCH_TERM(value),
});
</script>

