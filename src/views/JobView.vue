<template>
  <div class="flex flex-col lg:flex-row flex-no-wrap w-full">
    <ToJobsPageLink class="p-5 lg:hidden" />
    <JobRelatedSidebar class="hidden lg:block" v-if="currentJob" :jobs="relatedJobs" :job="currentJob" />
    <JobDetails />
  </div>
</template>

<script lang="ts" setup>
import JobRelatedSidebar from "@/components/JobResults/JobRelatedSidebar/JobRelatedSidebar.vue"
import ToJobsPageLink from "@/components/Shared/ToJobsPageLink.vue"
import JobDetails from "@/components/JobResults/JobDetails.vue"
import { ref, watchEffect, computed } from "vue"
import { useJobsStore } from "@/stores/jobs"
import { storeToRefs } from "pinia"
import type { Job } from "@/api/types"
import { useCurrentJob } from "@/composables/useCurrentJob"

const jobsStore = useJobsStore()
const { ALL_JOBS } = storeToRefs(jobsStore)
const { FETCH_JOBS } = jobsStore
const { currentJob } = useCurrentJob(ALL_JOBS)

const relatedJobs = computed(() => {
  return ALL_JOBS.value.filter(
    (job: Job) => job.organization === currentJob?.value?.organization
  )
})


watchEffect(async () => {
  if (ALL_JOBS.value.length === 0) {
    await FETCH_JOBS()
  }
})
</script>
