<template>
  <div
    class="flex flex-col border-r border-solid border-brand-gray-1 bg-white w-full lg:w-96 fixed lg:left-0 z-10 h-screen"
    :style="sidebarHeight"
  >
    <section class="pb-5 relative">
      <slot></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useUIStore } from "@/stores/ui"
import { storeToRefs } from "pinia"
// import ToJobsPageLink from "../Shared/ToJobsPageLink.vue"
const SidebarLayoutRef = ref<HTMLElement | null>(null)
defineExpose({
  SidebarLayoutRef
})
const uiStore = useUIStore()
const { mainNavHeight } = storeToRefs(uiStore)

const sidebarHeight = computed(() => {
  const height = window.innerHeight - mainNavHeight.value
  return {
    height: `${height}px`
  }
})
</script>
