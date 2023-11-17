import { computed, type Ref, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { type Job } from '@/api/types'

export const useCurrentJob = (jobs: Ref<Job[]>) => {
  const route = useRoute()
  const jobID = computed(() => +route.params.id)
  const currentJob = computed(() => {
    return jobs.value.find(job => job.id === jobID.value) || null
  })
  return {
    currentJob
  }
}