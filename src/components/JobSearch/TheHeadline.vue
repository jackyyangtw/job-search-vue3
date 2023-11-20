<template>
  <section class="mb-16">
    <h1 class="mb-14 text-7xl md:text-8xl font-bold tracking-tighter">
      <div class="relative" style="height: 100px">
        <transition name="slide-up">
          <span class="block absolute" :class="headLineClass" :key="headLine">{{ headLine }}</span>
        </transition>
      </div>
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
const timeout = 2000
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: 0.3s ease;
}
.slide-up-enter-from{
  transform: translateY(30%);
  opacity: 0;
}
.slide-up-leave-to  {
  transform: translateY(-30%);
  opacity: 0;
}

</style>

