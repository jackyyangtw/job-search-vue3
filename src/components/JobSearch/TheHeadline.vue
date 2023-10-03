<template>
  <section class="mb-16">
    <h1 class="mb-14 text-7xl md:text-8xl font-bold tracking-tighter">
      <span :class="headLineClass">{{ headLine }}</span> 
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Vue Corp.</h2>
  </section>
</template>

<script lang="ts" setup>
import { nextElementList } from '@/utils/nextElementList'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
const headLine = ref('Build')
const timer = ref<ReturnType<typeof setInterval> | null>(null)
const headLineClass = computed(() => {
  return {
    [headLine.value.toLowerCase()]: true
  }
})
const timeout = 1000
const changeHeadline = () => {
  const actions = ['Build', 'Create', 'Design', 'Code']
  timer.value = setInterval(() => {
    headLine.value = nextElementList(actions, headLine.value)
  }, timeout)
}
onMounted(() => {
  changeHeadline()
})
onBeforeUnmount(() => {
  if(timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style scoped>

.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #fbbc05;
}
.code {
  color: #ea4335;
}

.scrollup-enter-active,
.scrollup-leave-active {
  transition: all 0.3s ease;
}
.scrollup-enter-from,
.scrollup-leave-to {
  transform: translateY(20px);
}

</style>

