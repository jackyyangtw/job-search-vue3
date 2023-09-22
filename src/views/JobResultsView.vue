<template>
  <div class="flex flex-row flex-no-wrap w-full">
    <JobFiltersSidebar></JobFiltersSidebar>
    <JobListings></JobListings>
  </div>
</template>

<script setup lang="ts">
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue'
import JobListings from '@/components/JobResults/JobListings.vue'
// import { useRoute } from 'vue-router';
// const route = useRoute()
// console.log(route.query)
</script>
