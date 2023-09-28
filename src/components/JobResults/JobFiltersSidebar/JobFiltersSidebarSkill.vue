<template>
  <div class="mt-2">
    <input 
      type="text" 
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="What do you want to do?" 
      v-model.lazy.trim="skillSearchTerm"
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const skillSearchTerm = computed({
  get: () => userStore.skillSearchTerm,
  set: (value) => userStore.UPDATE_SKILL_SEARCH_TERM(value),
});
</script>
