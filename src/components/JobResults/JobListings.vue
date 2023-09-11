<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
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
  </main>
</template>

<script setup>
import JobListing from '@/components/JobResults/JobListing.vue'
import { useJobsStore } from '@/stores/jobs'
import { usePrevAndNextPage } from '@/composables/usePrevAndNextPage'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const jobsStore = useJobsStore()
const { FILTERED_JOBS } = storeToRefs(jobsStore)

const currentPage = computed(() => parseInt(route.query.page || '1'))
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))
const { prevPage, nextPage } = usePrevAndNextPage(currentPage, maxPage)

const displayedJobs = computed(() => {
  const page = currentPage.value
  const firstIndex = (page - 1) * 10
  const lastIndex = page * 10
  return FILTERED_JOBS.value.slice(firstIndex, lastIndex)
})

const { FETCH_JOBS } = jobsStore

onMounted(() => {
  FETCH_JOBS()
})
</script>

