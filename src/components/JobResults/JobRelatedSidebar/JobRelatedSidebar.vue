<template>
  <SidebarLayout class="overflow-y-scroll" ref="jobRelatedSideBarLayoutRef">
    <ToJobsPageLink class="translate-y-[-20px]" />
    <div>
      <div>
        Other jobs of
        <span class="text-brand-blue-1 ml-2 font-bold"
          >{{ job.organization }} ({{ jobs.length }})</span
        >
      </div>
      <JobRelatedSidebarCard v-for="job in jobs" :job="job" :key="job.id" :id="job.id" />
    </div>
  </SidebarLayout>
</template>

<script setup lang="ts">
import SidebarLayout from "@/components/layouts/SidebarLayout.vue"
import JobRelatedSidebarCard from "./JobRelatedSidebarCard.vue"
import ToJobsPageLink from "@/components/Shared/ToJobsPageLink.vue"
import { useUIStore } from "@/stores/ui"
import { storeToRefs } from "pinia"
import type { Job } from "@/api/types"
import { type PropType, toRefs, ref, watchEffect, computed } from "vue"
import { useRoute } from "vue-router"
const props = defineProps({
  jobs: {
    type: Array as PropType<Job[]>,
    required: true
  },
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})

const { job } = toRefs(props)

const jobRelatedSideBarLayoutRef = ref<InstanceType<typeof SidebarLayout> | null>(null)
const route = useRoute()
const scrollId = computed(() => route.params.id)
const uiStore = useUIStore()
const { mainNavHeight } = storeToRefs(uiStore)
watchEffect(() => {
  if (jobRelatedSideBarLayoutRef.value?.$el) {
    const target: HTMLElement | null = document.getElementById(scrollId.value as string)
    const parentTop = jobRelatedSideBarLayoutRef.value?.$el.offsetTop || 0
    const top = target?.offsetTop || 0
    jobRelatedSideBarLayoutRef.value?.$el.scroll({
      top: top - parentTop - 80 + mainNavHeight.value,
      left: 0,
      behavior: "smooth"
    })
  }
})
</script>
