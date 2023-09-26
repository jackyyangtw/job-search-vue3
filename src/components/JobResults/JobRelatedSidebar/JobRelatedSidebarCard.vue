<template>
  <router-link :to="`/jobs/results/${linkParams}`" 
  class="my-6 p-5 block rounded border border-solid border-brand-gray-3 hover:border-brand-blue-1 hover:bg-black/[0.05]"
  >
    <div ref="cardRef">
      <h2 class="text-2xl">{{ job.title }}</h2>
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
import { type PropType } from 'vue';
import { useRoute } from 'vue-router'
import { watchEffect, ref, toRef } from 'vue'
import type { Ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

const locationsCount = props.job.locations.length

const linkParams = +props.job.id

const route = useRoute();

const emit = defineEmits<{
  (e:'update:job', value: Ref) : void
}>();
const cardRef = ref<HTMLDivElement | null>(null)
const { top } = useElementBounding(cardRef)

// watchEffect(() => {
//   if(+route.params.id === props.job.id) {
//     emit('update:job', toRef({
//       ...props.job,
//       top: top.value
//     }));
//   }
// })


</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply border-2 border-brand-blue-1;
}
</style>

