<template>
  <div class="mx-auto mt-8" v-if="!isLoadingJobs && FILTERED_JOBS.length > 0">
    <div class="flex">
      <p class="text-sm flex-grow">
        Page {{ currentPage }} <span> / {{ maxPage }}</span>
      </p>
      <div class="flex items-center justify-center">
        <router-link
          v-if="prevPage"
          role="link"
          :to="{ name: 'JobResults', query: { page: prevPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          >Previous</router-link
        >
        <!-- 加上 role 是為了讓測試成功，沒有加的話測試會失敗 -->
        <router-link
          v-if="nextPage"
          role="link"
          :to="{ name: 'JobResults', query: { page: nextPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          >Next</router-link
        >
      </div>
    </div>
  </div>
  <p v-else-if="!isLoadingJobs && FILTERED_JOBS.length === 0">No job found</p>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia";
import { useJobsStore } from "@/stores/jobs"
import { usePrevAndNextPage } from "@/composables/usePrevAndNextPage"
defineProps<{
  isLoadingJobs: boolean
}>()
const route = useRoute()
const jobsStore = useJobsStore()
const { FILTERED_JOBS } = storeToRefs(jobsStore)
const currentPage = computed(() => parseInt((route.query.page as string) || "1"))
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))
const { prevPage, nextPage } = usePrevAndNextPage(currentPage, maxPage)
</script>
