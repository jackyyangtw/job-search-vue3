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

<script>
import JobListing from './JobListing.vue'
import { useJobsStore, FETCH_JOBS, FILTERED_JOBS } from '@/stores/jobs'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'JobListings',
  components: {
    JobListing
  },
  computed: {
    ...mapState(useJobsStore, [FILTERED_JOBS]),
    currentPage() {
      return parseInt(this.$route.query.page || '1')
    },
    prevPage() {
      const prevPage = this.currentPage - 1
      return prevPage >= 1 ? prevPage : undefined
    },
    nextPage() {
      const nextPage = this.currentPage + 1
      const totalPage = Math.ceil(this.FILTERED_JOBS.length / 10)
      return nextPage <= totalPage ? nextPage : undefined
    },
    displayedJobs() {
      const page = this.currentPage
      const firstIndex = (page - 1) * 10
      const lastIndex = page * 10
      return this.FILTERED_JOBS.slice(firstIndex, lastIndex)
    }
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS])
  },
  async created() {
    this.FETCH_JOBS()
  }
}
</script>

