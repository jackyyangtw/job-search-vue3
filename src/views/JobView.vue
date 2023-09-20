<template>
  <div class="flex flex-row flex-no-wrap w-full">
    <JobRelatedSidebar :jobs="relatedJobs" />
    <JobResult :job="thisjob"/>
  </div>
</template>


<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import JobRelatedSidebar  from '@/components/JobResults/JobRelatedSidebar/JobRelatedSidebar.vue'
import JobResult from '@/components/JobResults/JobResult.vue'
import { useJobsStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia';
import type { Job } from '@/api/types';

const jobsStore = useJobsStore();
const {ALL_JOBS} = storeToRefs(jobsStore);
const {FETCH_JOBS} = jobsStore;
const relatedJobs = ref<Job[]>([]);
const thisjob = ref<Job | undefined>(undefined);

const route = useRoute();
watchEffect(async() => {
  let jobID = +route.params.id;
  if(ALL_JOBS.value.length  === 0) {
    await FETCH_JOBS();
  } 
  
  thisjob.value = ALL_JOBS.value.find((job: Job) => job.id === jobID);
  relatedJobs.value = ALL_JOBS.value.filter((job: Job) => job.organization === thisjob?.value?.organization);

})
</script>