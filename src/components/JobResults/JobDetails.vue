<template>
    <JobResultLayout>
      <template #content>
        <JobListing v-if="currentJob" :job="currentJob" :key="currentJob.id" element="div">
          <template #others>
            <div class="px-8 py-4">
              <h3 class="mt-1 mb-2">Descriptions:</h3>
              <ul class="list-disc pl-8">
                <li v-for="desc in currentJob.description" :key="desc">{{ desc }}</li>
              </ul>
            </div>
            <div class="px-8 py-4">
              <h3 class="mt-1 mb-2">preferredQualifications:</h3>
              <ul class="list-disc pl-8">
                <li
                  v-for="preferredQualification in currentJob.preferredQualifications"
                  :key="preferredQualification"
                >
                  {{ preferredQualification }}
                </li>
              </ul>
            </div>
            <div class="px-8 py-4">
              <h3 class="mt-1 mb-2">dateAdded:</h3>
              <ul class="list-disc pl-8">
                <li>{{ currentJob.dateAdded }}</li>
              </ul>
            </div>
          </template>
        </JobListing>
      </template>
    </JobResultLayout>
</template>

<script setup lang="ts">
import JobResultLayout from "@/components/layouts/JobResultLayout.vue"
import JobListing from "@/components/JobResults/JobListing.vue"
import { watch } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useJobsStore } from "@/stores/jobs"
import { useCurrentJob } from "@/composables/useCurrentJob"

const jobsStore = useJobsStore()
const { ALL_JOBS } = storeToRefs(jobsStore)
const { FETCH_JOBS } = jobsStore
const { currentJob } = useCurrentJob(ALL_JOBS)

const route = useRoute()

watch(
  () => route.params.id,
  async () => {
    if (ALL_JOBS.value.length === 0) {
      await FETCH_JOBS()
    }
  }
)

</script>

