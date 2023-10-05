<template>
  <div
    class="flex flex-col p-4 border-r border-solid border-brand-gray-1 bg-white w-full lg:w-96 fixed lg:left-0 z-10"
    :style="sidebarStyles"
  >
    <section class="sidebar-content pb-5 relative" ref="SidebarContentRef">
      <slot></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useUIStore } from "@/stores/ui"
import { storeToRefs } from "pinia"
import { useWindowSize } from "@vueuse/core"
import { useElementSize } from "@vueuse/core"
const SidebarContentRef = ref<HTMLElement | null>(null)
const contentHeight = ref<number | undefined>(0)
onMounted(() => {
  contentHeight.value = SidebarContentRef.value?.clientHeight
})

defineExpose({
  SidebarContentRef
})

const uiStore = useUIStore()
const { mainNavHeight } = storeToRefs(uiStore)
const { height: windowHeight } = useWindowSize()
const elementHeight = computed(() => windowHeight.value - mainNavHeight.value)
const sidebarStyles = computed(() => {
  return {
    height: `${elementHeight.value}px`
  }
})
</script>
