<template>
  <div class="flex flex-row flex-no-wrap w-full">

    <JobRelatedSidebar v-if="thisjob" :jobs="relatedJobs" :job="thisjob"/>

    <JobResultLayout>
      <template #content>
        <JobListing v-if="thisjob" :job="thisjob" :key="thisjob.id" element="div">
          <template #others>
            <div class="px-8 py-4">
              <h3 class="mt-1 mb-2">Descriptions:</h3>
              <ul class="list-disc pl-8">
                <li v-for="desc in thisjob.description" :key="desc">{{ desc }}</li>
              </ul>
            </div>
            <div class="px-8 py-4">
              <h3 class="mt-1 mb-2">preferredQualifications:</h3>
              <ul class="list-disc pl-8">
                <li v-for="preferredQualification in thisjob.preferredQualifications" :key="preferredQualification">{{ preferredQualification }}</li>
              </ul>
            </div>
            <div class="px-8 py-4">
              <h3 class="mt-1 mb-2">dateAdded:</h3>
              <ul class="list-disc pl-8">
                <li>{{ thisjob.dateAdded }}</li>
              </ul>
            </div>
          </template>
        </JobListing>
      </template>
    </JobResultLayout>
  </div>
</template>


<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import JobRelatedSidebar  from '@/components/JobResults/JobRelatedSidebar/JobRelatedSidebar.vue'
import JobListing from '@/components/JobResults/JobListing.vue'
import JobResultLayout from '@/components/layouts/JobResultLayout.vue'
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