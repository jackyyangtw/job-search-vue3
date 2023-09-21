<template>
  <SidebarLayout>
    
    <router-link :to="{ name:'JobResults' }">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-5"/>
      <span class="mr-5">Back to jobs search</span>
    </router-link>
    <div class="mt-5">
      Other jobs of <span class="text-brand-blue-1 ml-2 font-bold">{{ job.organization }} ({{ jobs.length }})</span>
    </div>
    <JobRelatedSidebarCard v-for="job in props.jobs" :job="job"/>
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

const {job} = toRefs(props);

</script>
