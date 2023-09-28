<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
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
const changeHeadline = () => {
  const actions = ['Build', 'Create', 'Design', 'Code']
  timer.value = setInterval(() => {
    headLine.value = nextElementList(actions, headLine.value)
  }, 1000)
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


.toTop-enter-active,
.toTop-leave-active {
  transition: all 0.3s;
}
.toTop-enter-from,
.toTop-leave-to {
  opacity: 0;
  transform: translateY(20px);
}


</style>

