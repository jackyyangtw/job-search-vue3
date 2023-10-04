<template>
  <div class="mobile w-full fixed top-0 z-10" ref="mobileSidebarRef">
    <div
      @click="emit('closeSidebar')"
      class="w-full bg-white cursor-pointer pl-4 pt-4 flex items-center text-3xl"
    >
      <font-awesome-icon class="mr-5" :icon="['fas', 'circle-xmark']" />
      <h3>Filters</h3>
    </div>
    <JobFiltersSidebar class="min-h-screen overflow-scroll" ref="JobFiltersSidebarRef">
      <template #mobile>
        <ActionButton text="Done" @click="emit('closeSidebar')" />
      </template>
    </JobFiltersSidebar>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue"
import JobFiltersSidebar from "./JobFiltersSidebar.vue"
import { ref, onMounted } from "vue"
const emit = defineEmits(["closeSidebar"])
const mobileSidebarRef = ref<HTMLElement | null>(null)
const JobFiltersSidebarRef = ref<HTMLElement | null>(null)
onMounted(() => {
  console.log(JobFiltersSidebarRef.value)
})
</script>
