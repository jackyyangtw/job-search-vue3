<template>
  <SidebarLayout>
    <div>
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-5"/>
      <span class="mr-5">Back to jobs search</span>
    </div>
    <JobRelatedSidebarCard v-for="job in relatedJobs" :job="job"/>
  </SidebarLayout>
</template>

<script setup lang="ts">
import SidebarLayout from '@/components/layouts/SidebarLayout.vue'
import JobRelatedSidebarCard from './JobRelatedSidebarCard.vue';
import { useJobsStore } from '@/stores/jobs';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Job } from '@/api/types';
const jobsStore = useJobsStore();
const {ALL_JOBS} = storeToRefs(jobsStore);
const route = useRoute();
const jobID = route.params.id;
const relatedJobs = computed(() => {
  const job = ALL_JOBS.value.find((job: Job) => job.id === jobID);
  if (!job) return [];
  return ALL_JOBS.value.filter((job: Job) => job.jobType === job.jobType && job.id !== jobID);
})

</script>
