<template>
  <div class="mobile-sidebar-control px-8 py-5 flex bg-white" v-show="!isLargeScreen">
    <div class="cursor-pointer mr-3" @click="toggleMobileSidebar">
      <font-awesome-icon class="text-2xl" :icon="['fas', 'filter']" />
    </div>
    <JobMatchedText />
  </div>
</template>

<script setup lang="ts">
import JobMatchedText from "@/components/Shared/JobMatchedText.vue"
const {} = defineProps<{
  isLargeScreen: boolean
  toggleMobileSidebar?: () => void
}>()
</script>
