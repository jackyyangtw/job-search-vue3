<template>
  <li class="flex flex-col flex-wrap my-10 lg:my-8 lg:flex-row lg:w-1/2">
    <figure class="w-full lg:w-6/12 min-h-[250px]" :style="teamImage"></figure>
    <div class="w-full pt-4 lg:w-6/12 lg:px-5">
      <h3 class="text-brand-blue-1 text-xl">{{ team.name }}</h3>
      <p class="text-sm py-4">{{ team.description }}</p>
      <router-link class="rounded bg-brand-blue-2 hover:bg-brand-blue-1 text-white p-3 inline-block" :to="teamJobsLink">See Jobs</router-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  team: {
    name: string
    description: string
    image: string
    querys: string[]
  }
}>()

const teamJobsLink = computed(() => {
  const querys = props.team.querys.join(' ')
  return {
    name: 'JobResults',
    query: {
      role: querys
    }
  }
})
const teamImage = computed(() => {
  return {
    background: `center/cover no-repeat url(${props.team.image})`
  }
})
</script>
