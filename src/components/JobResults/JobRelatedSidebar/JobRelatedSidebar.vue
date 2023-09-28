<template>
  <SidebarLayout class="overflow-y-scroll" ref="jobRelatedSideBarLayoutRef">
    <router-link :to="{ name:'JobResults' }">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-5"/>
      <span class="mr-5">Back to jobs search</span>
    </router-link>
    <div class="mt-5">
      Other jobs of <span class="text-brand-blue-1 ml-2 font-bold">{{ job.organization }} ({{ jobs.length }})</span>
    </div>
    <JobRelatedSidebarCard v-for="(job) in jobs" :job="job" :key="job.id" :id="job.id" />
  </SidebarLayout>
</template>

<script setup lang="ts">
import SidebarLayout from '@/components/layouts/SidebarLayout.vue'
import JobRelatedSidebarCard from './JobRelatedSidebarCard.vue';
import { useUIStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import type { Job } from '@/api/types';
import { type PropType, toRefs, ref, watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
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

const {job} = toRefs(props);

const jobRelatedSideBarLayoutRef = ref<InstanceType<typeof SidebarLayout> | null>(null);
const route = useRoute();
const scrollId = computed(() => route.params.id)
const uiStore = useUIStore();
const { mainNavHeight } = storeToRefs(uiStore);
watchEffect(() => {
  if(jobRelatedSideBarLayoutRef.value?.$el) {
    const target: HTMLElement | null = document.getElementById(scrollId.value as string);
    const parentTop = jobRelatedSideBarLayoutRef.value?.$el.offsetTop || 0;
    const top = target?.offsetTop || 0;
    jobRelatedSideBarLayoutRef.value?.$el.scroll({
      top: top - parentTop - 20 + mainNavHeight.value,
      left: 0,
      behavior: "smooth",
    })
  }
});

</script>
