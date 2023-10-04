<template>
  <TheHero></TheHero>
</template>

<script setup lang="ts">
import TheHero from "../components/JobSearch/TheHero.vue"
import { useUserStore } from "@/stores/user"
import { onMounted } from "vue"
const { CLEAR_USER_JOB_FILTER_SELECTIONS } = useUserStore()
onMounted(() => {
  CLEAR_USER_JOB_FILTER_SELECTIONS()
})
</script>
