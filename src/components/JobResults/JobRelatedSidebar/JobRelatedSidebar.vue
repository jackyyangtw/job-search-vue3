<template>
  <SidebarLayout class="h-screen overflow-y-scroll" ref="jobRelatedSideBarLayoutRef">
    
    <router-link :to="{ name:'JobResults' }">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-5"/>
      <span class="mr-5">Back to jobs search</span>
    </router-link>
    <div class="mt-5">
      Other jobs of <span class="text-brand-blue-1 ml-2 font-bold">{{ job.organization }} ({{ jobs.length }})</span>
    </div>
    <JobRelatedSidebarCard v-for="(job) in jobs" :job="job" :key="job.id" @update:job="handleCardScroll" :id="job.id" />
  </SidebarLayout>
</template>

<script setup lang="ts">
import SidebarLayout from '@/components/layouts/SidebarLayout.vue'
import JobRelatedSidebarCard from './JobRelatedSidebarCard.vue';
import type { Job } from '@/api/types';
import { type PropType, type Ref, toRefs, ref, watchEffect } from 'vue';
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


// https://vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs
const jobRelatedSideBarLayoutRef = ref<InstanceType<typeof SidebarLayout> | null>(null);
const route = useRoute();
// const handleCardScroll = (val: Ref) => {
//   // console.log(val.value);
//   const scrollId = val.value?.id;
//   const target: HTMLElement | null = document.getElementById(scrollId);
//   console.log(target);
//   target?.scroll({
//     top: val.value.top,
//     left: 0,
//     behavior: "smooth",
//   })
// }

watchEffect(() => {
  if(jobRelatedSideBarLayoutRef.value?.$el) {
    const scrollId: string = route.params.id;
    const target: HTMLElement | null = document.getElementById(scrollId);
    const parentTop = jobRelatedSideBarLayoutRef.value?.$el.offsetTop || 0;
    const top = target?.offsetTop || 0;
    jobRelatedSideBarLayoutRef.value?.$el.scroll({
      top: top - parentTop - 20,
      left: 0,
      behavior: "smooth",
    })
  }
});

</script>
