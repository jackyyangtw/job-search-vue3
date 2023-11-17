<template>
  <JobResultLayout class="relative">
    <template #content>
      <LoadingSpinner
        class="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]"
        v-show="isLoadingJobs"
      />
      <job-listing
        v-show="!isLoadingJobs"
        v-for="jobItem in displayedJobs"
        :key="jobItem.id"
        :job="jobItem"
        element="router-link"
      />
    </template>

    <template #bottom>
      <JobListingsPagination :isLoadingJobs="isLoadingJobs"/>
    </template>
  </JobResultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"
import { storeToRefs } from "pinia"
import { useJobsStore } from "@/stores/jobs"
import { useDegreesStore } from "@/stores/degrees"
import JobListing from "@/components/JobResults/JobListing.vue"
import JobResultLayout from "../layouts/JobResultLayout.vue"
import LoadingSpinner from "../Shared/LoadingSpinner.vue"
import JobListingsPagination from "./JobListingsPagination.vue"
import type { Job } from "@/api/types"

const route = useRoute()
const router = useRouter()

const jobsStore = useJobsStore()
const { FETCH_JOBS } = jobsStore
const { FILTERED_JOBS, jobs } = storeToRefs(jobsStore)

const currentPage = computed(() => parseInt((route.query.page as string) || "1"))

const displayedJobs = computed(() => {
  const page = currentPage.value
  const firstIndex = (page - 1) * 10
  const lastIndex = page * 10
  return FILTERED_JOBS.value.slice(firstIndex, lastIndex) as Job[]
})

const userStore = useUserStore()
const { skillSearchTerm,locationSearchTerm } = storeToRefs(userStore)
const redirectPage = (newVal: string) => {
  if (router.options.history.state.back === "/job-search-vue3") return
  if(newVal !== "") {
    router.push({ name: "JobResults", query: { page: 1 } })
  }
}
watch(skillSearchTerm, (newVal) => {
  redirectPage(newVal)
})
watch(locationSearchTerm, (newVal) => {
  redirectPage(newVal)
}) 

const { FETCH_DEGREES } = useDegreesStore()
const isLoadingJobs = ref(true)
onMounted(async () => {
  await FETCH_DEGREES()
  if (jobs.value.length) {
    isLoadingJobs.value = false
  }
  if (!jobs.value.length) {
    try {
      isLoadingJobs.value = true
      await FETCH_JOBS()
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        isLoadingJobs.value = false
      }, 500)
    }
  }
})
</script>
