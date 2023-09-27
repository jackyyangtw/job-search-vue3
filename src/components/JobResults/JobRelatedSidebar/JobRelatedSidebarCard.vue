<template>
  <router-link :to="`/jobs/results/${linkParams}`" 
  class="my-6 p-5 block rounded border border-solid border-brand-gray-3 hover:border-brand-blue-1 hover:bg-black/[0.05]"
  >
    <div ref="cardRef">
      <h2 class="text-2xl">{{ job.title }}</h2>
      <h2 class="text-brand-blue-1 mt-2 text-lg">{{ job.organization }}</h2>
      <div class="mt-2">
        <span v-for="(location,index) in job.locations" :key="location">
          {{ location }}
          <span v-if="index !== locationsCount - 1">,&nbsp;</span> 
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Job } from '@/api/types'
import { ref, type Ref, type PropType } from 'vue';
const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

const locationsCount = props.job.locations.length

const linkParams = +props.job.id

const emit = defineEmits<{
  (e:'update:job', value: Ref) : void
}>();
const cardRef = ref<HTMLDivElement | null>(null)

</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply border-2 border-brand-blue-1;
}
</style>

