<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96 fixed left-0 top:100 z-10 h-screen" :style="sidebarHeight">
    <section class="pb-5">
      <slot></slot>
    </section>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUIStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
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