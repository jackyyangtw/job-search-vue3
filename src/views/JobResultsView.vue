<template>
  <div class="flex flex-col lg:flex-row flex-no-wrap w-full relative bg-brand-gray-2">

    <JobFilterSidebarMobileFilter :isLargeScreen="isLargeScreen" :toggleMobileSidebar="toggleMobileSidebar"/>

    <transition name="fade-right">
      <JobFiltersSidebar v-show="isSidebarOpen" @closeSidebar="closeSidebarHandler" />
    </transition>
    
    <JobListings />

  </div>
</template>

<script setup lang="ts">
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue"
import JobFilterSidebarMobileFilter from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarMobileFilter.vue"
import JobListings from "@/components/JobResults/JobListings.vue"
import { useMediaQuery } from "@vueuse/core"
import { ref, onMounted, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/stores/user"

const isLargeScreen = useMediaQuery("(min-width: 1024px)")
const isSidebarOpen = ref(false)
const toggleMobileSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
watchEffect(() => {
  if (isLargeScreen.value) {
    isSidebarOpen.value = true
  }
})
const closeSidebarHandler = () => {
  isSidebarOpen.value = false
}

const route = useRoute()
const { UPDATE_SKILL_SEARCH_TERM, UPDATE_LOCATION_SEARCH_TERM } = useUserStore()
const parseSkillSearchTerm = () => {
  const role = (route.query.role as string) || ""
  UPDATE_SKILL_SEARCH_TERM(role)
}
const parseLocationSearchTerm = () => {
  const location = (route.query.location as string) || ""
  UPDATE_LOCATION_SEARCH_TERM(location)
}

onMounted(() => {
  parseSkillSearchTerm()
  parseLocationSearchTerm()
})
</script>

<style scoped>
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.3s ease;
}

.fade-right-enter-from,
.fade-right-leave-to {
  transform: translateX(-100%);
}

.fade-right-enter-to,
.fade-right-leave-from {
  transform: translateX(0);
}
</style>
