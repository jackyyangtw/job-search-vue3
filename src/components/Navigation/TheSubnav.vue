<template>
  <div class="h-16 w-full border-b border-solid border-brand-grey-1 bg-white">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1"> {{ totalJobs }} </span>
          jobs matched
        </span>
      </div>
      <div v-else-if="onHomePage">
        Wellcome!
      </div>
      <div v-else-if="onTeamsPage">
        Interested ? Join our team!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const jobsStore = useJobsStore()
const { FILTERED_JOBS } = storeToRefs(jobsStore)
const totalJobs = computed(() => FILTERED_JOBS.value.length)
const onJobResultsPage = computed(() => route.name === 'JobResults')
const onHomePage = computed(() => route.name === 'Home')
const onTeamsPage = computed(() => route.name === 'Teams')
</script>
