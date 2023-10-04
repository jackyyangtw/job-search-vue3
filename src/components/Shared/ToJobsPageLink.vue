<template>
  <div class="w-full bg-white sticky top-0 left-0 z-10 p-4 border-b-2">
    <router-link :to="{ name: 'JobResults', query: { role: skillSearchTerm } }">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-5" />
      <span class="mr-5">Back to jobs search</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user"
import { storeToRefs } from "pinia"
import { computed } from "vue"
const userStore = useUserStore()
const { skillSearchTerm } = storeToRefs(userStore)
const pos = computed(() => {
  return {
    top: 64 + "px"
  }
})
</script>
