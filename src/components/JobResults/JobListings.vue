<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in 3" :key="job" :job="job" />
    </ol>
  </main>
</template>

<script>
import JobListing from './JobListing.vue'
export default {
  name: 'JobListings',
  components: {
    JobListing
  }
}
</script>

