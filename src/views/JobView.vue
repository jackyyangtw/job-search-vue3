<template>
  <div class="flex flex-row flex-no-wrap w-full">
    <JobRelatedSidebar />
    <div>single job {{ currentJobId }}</div>
  </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import JobRelatedSidebar  from '@/components/JobResults/JobRelatedSidebar/JobRelatedSidebar.vue'
const route = useRoute()
const currentJobId = computed(() => route.params.id)
</script>