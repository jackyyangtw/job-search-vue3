<template>
  <li class="mb-7">
    <router-link
      :to="jobPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">{{ job.title }}</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <FontAwesomeIcon icon="building" class="mr-3"/>
            <span>{{ job.organization }}</span>
          </div>
          <ul>
            <FontAwesomeIcon icon="location-dot" class="mr-3" />
            <li class="mr-5 inline-block" v-for="(location,index) in job.locations" :key="location">
                <span>
                  {{ location }}, 
                </span>
            </li>
          </ul>
          <div class="mr-5">
            <FontAwesomeIcon class="mr-3" icon="fa-chart-simple" />
            <span> {{ job.degree }}</span>
          </div>
          <div class="mr-5">
            <FontAwesomeIcon class="mr-3" icon="fa-clock" />
            <span> {{ job.jobType }}</span>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Qulifications:</h3>
          <div>
            <ul class="list-disc pl-8">
              <li v-for="qualification in job.minimumQualifications" :key="qualification">
                <span>{{ qualification }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="my-2 text-center">
        <router-link :to="jobPageLink" class="text-brand-blue-1">Expand</router-link>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { Job } from '@/api/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

const jobPageLink = computed(() => `/jobs/results/${props.job.id}`)
</script>

