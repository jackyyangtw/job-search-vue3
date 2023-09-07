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
import axios from 'axios'

const baseUrl = import.meta.env.VITE_APP_API_URL

export default {
  name: 'JobListings',
  components: {
    JobListing
  },
  data() {
    return {
      jobs: []
    }
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page || '1')
    },
    prevPage() {
      const prevPage = this.currentPage - 1
      return prevPage >= 1 ? prevPage : undefined
    },
    nextPage() {
      const nextPage = this.currentPage + 1
      const totalPage = Math.ceil(this.jobs.length / 10)
      console.log('NEXT PAGE', nextPage)
      console.log('TOTAL PAGE', totalPage)
      return nextPage <= totalPage ? nextPage : undefined
    },
    // totalPage() {
    //   return Math.ceil(this.jobs.length / 10)
    // },
    displayedJobs() {
      const page = this.currentPage
      const firstIndex = (page - 1) * 10
      const lastIndex = page * 10
      return this.jobs.slice(firstIndex, lastIndex)
    }
  },
  async created() {
    const res = await axios.get(`${baseUrl}/jobs`)
    this.jobs = res.data
  }
}
</script>

