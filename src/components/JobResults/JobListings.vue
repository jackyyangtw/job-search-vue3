<template>
  <JobResultLayout class="relative">

    <template #content>
      <LoadingSpinner class="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]" v-show="isLoadingJobs"/>
      <job-listing v-show="!isLoadingJobs" v-for="jobItem in displayedJobs" :key="jobItem.id" :job="jobItem" element="router-link" />
    </template>

    <template #bottom>
      <div class="mx-auto mt-8" v-if="!isLoadingJobs && FILTERED_JOBS.length > 0">
        <div class="flex">
          <p class="text-sm flex-grow">Page {{ currentPage }} <span> / {{ maxPage }}</span></p>
          <div class="flex items-center justify-center">
            <router-link
              v-if="prevPage"
              role="link"
              :to="{ name: 'JobResults', query: { page: prevPage } }"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
              >Previous</router-link
            >
            <!-- 加上 role 是為了讓測試成功，沒有加的話測試會失敗 -->
            <router-link
              v-if="nextPage"
              role="link"
              :to="{ name: 'JobResults', query: { page: nextPage } }"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
              >Next</router-link
            >
          </div>
        </div>
      </div>
      <p v-else-if="!isLoadingJobs && FILTERED_JOBS.length === 0">No job found</p>
    </template>
    
  </JobResultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import { useDegreesStore } from '@/stores/degrees'
import { usePrevAndNextPage } from '@/composables/usePrevAndNextPage'
import JobListing from '@/components/JobResults/JobListing.vue'
import JobResultLayout from '../layouts/JobResultLayout.vue'
import LoadingSpinner from '../Shared/LoadingSpinner.vue'
import type { Job } from '@/api/types'

const route = useRoute()
const router = useRouter()

const jobsStore = useJobsStore()
const { FETCH_JOBS } = jobsStore
const { FILTERED_JOBS, jobs } = storeToRefs(jobsStore)

const currentPage = computed(() => parseInt((route.query.page as string) || '1'))

const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))
const { prevPage, nextPage } = usePrevAndNextPage(currentPage, maxPage)

const displayedJobs = computed(() => {
  const page = currentPage.value
  const firstIndex = (page - 1) * 10
  const lastIndex = page * 10
  return FILTERED_JOBS.value.slice(firstIndex, lastIndex) as Job[]
})

const userStore = useUserStore()
const { skillSearchTerm } = storeToRefs(userStore)
watch(skillSearchTerm, (newVal) => {
  if(newVal) {
    router.push({ name: 'JobResults', query: { page: 1 } })
  }
})

const { FETCH_DEGREES } = useDegreesStore()

const isLoadingJobs = ref(true);
onMounted(async() => {
  if(jobs.value.length) {
    isLoadingJobs.value = false
  } 
  if(!jobs.value.length) {
    try {
      isLoadingJobs.value = true
      await FETCH_JOBS()
      await FETCH_DEGREES()
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        isLoadingJobs.value = false
      }, 500);
    }
  }
})
</script>

