<template>
  <SidebarLayout class="h-screen overflow-y-scroll">
    
    <router-link :to="{ name:'JobResults' }">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-5"/>
      <span class="mr-5">Back to jobs search</span>
    </router-link>
    <div class="mt-5">
      Other jobs of <span class="text-brand-blue-1 ml-2 font-bold">{{ job.organization }} ({{ jobs.length }})</span>
    </div>
    <JobRelatedSidebarCard v-for="job in jobs" :job="job"/>
  </SidebarLayout>
</template>

<script setup lang="ts">
import SidebarLayout from '@/components/layouts/SidebarLayout.vue'
import JobRelatedSidebarCard from './JobRelatedSidebarCard.vue';
import type { Job } from '@/api/types';
import {type PropType,toRefs } from 'vue';
const props = defineProps({
  jobs: {
    type: Array as PropType<Job[]>,
    required: true
  },
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

// const orederedJobs = computed(() => {
//   // job id === route params id 則排到第一個
//   const orderedJobs = props.jobs.sort((a, b) => {
//     if (a.id === props.job.id) {
//       return -1
//     } else if (b.id === props.job.id) {
//       return 1
//     } else {
//       return 0
//     }
//   })
//   return orderedJobs
// })

const {job} = toRefs(props);

</script>
