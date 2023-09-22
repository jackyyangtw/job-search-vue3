<template>
  <router-link :to="`/jobs/results/${linkParams}`" class="block my-6 p-5 rounded border border-solid border-brand-gray-3 hover:border-brand-blue-1 hover:bg-black/[0.05]">
    <h2 class="text-2xl">{{ job.title }}</h2>
    <div class="mt-2">
      <span v-for="(location,index) in job.locations" :key="location">
        {{ location }}
        <span v-if="index !== locationsCount - 1">,&nbsp;</span> 
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Job } from '@/api/types'
import { type PropType } from 'vue';
const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

const locationsCount = props.job.locations.length

const linkParams = props.job.id

</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply border-2 border-brand-blue-1;
}
</style>

