<template>
  <div class="flex justify-center items-center">
    <span class="text-brand-green-1 mr-2 font-bold"> {{ FILTERED_JOBS.length }} </span>
    jobs matched
  </div>
</template>

<script setup lang="ts">
import { useJobsStore } from "@/stores/jobs"
import { storeToRefs } from "pinia"
const jobsStore = useJobsStore()
const { FILTERED_JOBS } = storeToRefs(jobsStore)
</script>
