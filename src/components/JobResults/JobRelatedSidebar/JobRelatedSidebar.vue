<template>
  <SidebarLayout>
    <router-link :to="{ name:'JobResults' }">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-5"/>
      <span class="mr-5">Back to jobs search</span>
    </router-link>
    <JobRelatedSidebarCard v-for="job in props.jobs" :job="job"/>
  </SidebarLayout>
</template>

<script setup lang="ts">
import SidebarLayout from '@/components/layouts/SidebarLayout.vue'
import JobRelatedSidebarCard from './JobRelatedSidebarCard.vue';
import type { Job } from '@/api/types';
import {type PropType } from 'vue';
const props = defineProps({
  jobs: {
    type: Array as PropType<Job[]>,
    required: true
  }
})

</script>
