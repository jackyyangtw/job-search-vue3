<template>
  <li class="flex my-5 w-1/2">
    <figure class="w-6/12" :style="teamImage"></figure>
    <div class="w-6/12 px-5">
      <h3 class="text-brand-blue-1 text-xl">{{ team.name }}</h3>
      <p class="text-sm py-4">{{ team.description }}</p>
      <router-link class="rounded bg-brand-blue-2 hover:bg-brand-blue-1 text-white p-3 inline-block" :to="teamJobsLink">See Jobs</router-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  team: {
    type: Object,
    required: true
  },
})
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

<style lang="scss" scoped>

</style>