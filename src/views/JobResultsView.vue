<template>
  <div class="flex flex-col lg:flex-row flex-no-wrap w-full relative">
    <!-- mobile sidebar control -->
    <div class="mobile-sidebar-control px-8 py-5 flex" v-if="!isLargeScreen">
      <div class="cursor-pointer mr-3" @click="toggleMobileSidebar">
        <font-awesome-icon class="text-2xl" :icon="['fas', 'filter']" />
      </div>
      <JobMatchedText />
    </div>
    <!-- mobile sidebar control -->

    <JobFiltersSidebar v-show="isLargeScreen" />
    <transition name="fade-left">
      <JobFiltersSideBarMobile
        v-show="!isLargeScreen && isMobileSidebarOpen"
        @closeSidebar="toggleMobileSidebar"
      />
    </transition>
    <JobListings />
  </div>
</template>

<script setup lang="ts">
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue"
import JobListings from "@/components/JobResults/JobListings.vue"
import JobFiltersSideBarMobile from "@/components/JobResults/JobFiltersSidebar/JobFiltersSideBarMobile.vue"
import JobMatchedText from "@/components/Shared/JobMatchedText.vue"
import { useMediaQuery } from "@vueuse/core"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useUserStore } from "@/stores/user"
const isLargeScreen = useMediaQuery("(min-width: 1024px)")
const isMobileSidebarOpen = ref(false)
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
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
.fade-left-enter-active,
.fade-left-leave-active {
  transition: all 0.3s ease;
}

.fade-left-enter-from,
.fade-left-leave-to {
  transform: translateX(100%);
}

.fade-left-enter-to,
.fade-left-leave-from {
  transform: translateX(0);
}
</style>
