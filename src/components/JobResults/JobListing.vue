<template>
  <li class="mb-7">
    <Component
      :is="element"
      :job="job"
      :to="jobPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white"
      :class="{ 'hover:shadow-gray': element === 'router-link' }"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">{{ job.title }}</h2>
        <div class="flex flex-wrap flex-row align-middle">
          <div class="mr-5 my-1">
            <FontAwesomeIcon icon="building" class="mr-3" />
            <span>{{ job.organization }}</span>
          </div>
          <ul class="mr-5 my-1">
            <FontAwesomeIcon icon="location-dot" class="mr-3" />
            <li
              class="inline-block"
              v-for="(location, index) in job.locations"
              :key="location"
              :class="{ 'mr-4': index !== locationsCount - 1 }"
            >
              <span>
                {{ location }}
              </span>
              <span v-if="index !== locationsCount - 1 && job.locations.length > 1">,</span>
            </li>
          </ul>
          <div class="mr-5 my-1">
            <FontAwesomeIcon class="mr-3" icon="fa-chart-simple" />
            <span> {{ job.degree }}</span>
          </div>
          <div class="mr-5 my-1">
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
      <div class="my-2 text-center" v-if="element === 'router-link'">
        <router-link :to="jobPageLink" class="text-brand-blue-1">Expand</router-link>
      </div>
      <slot name="others"></slot>
    </Component>
  </li>
</template>

<script setup lang="ts">
import { computed, type PropType, toRefs } from "vue"
import type { Job } from "@/api/types"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
// import JobRes
const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  },
  element: {
    type: String,
    required: true
  }
})

const { job } = toRefs(props)

const locationsCount = computed(() => job.value.locations.length)

const jobPageLink = computed(() => `/jobs/results/${props.job.id}`)
</script>
