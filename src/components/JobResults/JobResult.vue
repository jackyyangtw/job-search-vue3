<template>
  <JobResultLayout>
    <template #content>
      <li class="mb-7">
        <div
          class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white"
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
                <li class="mr-5 inline-block" v-for="(location) in job.locations" :key="location">
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
            <h3 class="mt-1 mb-2">Qulifications:</h3>
            <div>
              <ul class="list-disc pl-8">
                <li v-for="qualification in job.minimumQualifications" :key="qualification">
                  <span>{{ qualification }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="px-8 py-4">
            <h3 class="mt-1 mb-2">Descriptions:</h3>
            <ul class="list-disc pl-8">
              <li v-for="desc in job.description" :key="desc">{{ desc }}</li>
            </ul>
          </div>
          <div class="px-8 py-4">
            <h3 class="mt-1 mb-2">preferredQualifications:</h3>
            <ul class="list-disc pl-8">
              <li v-for="preferredQualification in job.preferredQualifications" :key="preferredQualification">{{ preferredQualification }}</li>
            </ul>
          </div>
          <div class="px-8 py-4">
            <h3 class="mt-1 mb-2">dateAdded:</h3>
            <ul class="list-disc pl-8">
              <li>{{ job.dateAdded }}</li>
            </ul>
          </div>
        </div>
      </li>
    </template>
  </JobResultLayout>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import JobResultLayout from '../layouts/JobResultLayout.vue';
import { type PropType } from 'vue';
import type { Job } from '@/api/types';
import { toRefs } from 'vue';
const props = defineProps({
  job: {
    type: Object as PropType<Job> | undefined,
    required: true
  }
})

const { job } = toRefs(props);
</script>

