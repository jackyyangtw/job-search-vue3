<template>
  <div class="flex flex-row flex-no-wrap w-full">
    <JobFiltersSidebar></JobFiltersSidebar>
    <JobListings></JobListings>
  </div>
</template>

<script>
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue'
import JobListings from '@/components/JobResults/JobListings.vue'
export default {
  name: 'JobResultView',
  components: {
    JobFiltersSidebar,
    JobListings
  }
}
</script>
