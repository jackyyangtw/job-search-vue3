<template>
  <router-link to="" class="block my-5 p-3 rounded border border-solid border-brand-gray-3 hover:border-brand-blue-1 hover:bg-black/[0.05]">
    <h2 class="text-2xl">{{ job.title }}</h2>
    <p>{{ job.organization }}</p>
  </router-link>
</template>

<script setup lang="ts">
import type { Job } from '@/api/types'
import { type PropType } from 'vue';
defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

</script>

