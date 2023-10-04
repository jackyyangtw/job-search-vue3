<template>
  <div class="flex flex-row justify-between">
    <JobMatchedText />
    <div class="flex items-center text-sm">
      <ActionButton text="Clear Filters" type="secondary" @click="clearAllFilter"></ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue"
import { useUserStore } from "@/stores/user"
import JobMatchedText from "@/components/Shared/JobMatchedText.vue"
import { useRouter } from "vue-router"
const router = useRouter()
const { CLEAR_USER_JOB_FILTER_SELECTIONS } = useUserStore()
const clearAllFilter = () => {
  CLEAR_USER_JOB_FILTER_SELECTIONS()
  router.push({ name: "JobResults", query: { page: 1 } })
}
</script>
