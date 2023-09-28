<template>
  <div class="flex flex-row justify-between">
    <div class="flex justify-center items-center">
      <span class="text-brand-green-1 mr-2 font-bold"> {{ FILTERED_JOBS.length }} </span>
      jobs matched
    </div>
    <div class="flex items-center text-sm">
      <ActionButton text="Clear Filters" type="secondary" @click="CLEAR_USER_JOB_FILTER_SELECTIONS"></ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue';
import { useUserStore } from '@/stores/user';
import { useJobsStore } from '@/stores/jobs';
import { storeToRefs } from 'pinia';
const { CLEAR_USER_JOB_FILTER_SELECTIONS } = useUserStore();
const { FILTERED_JOBS } = storeToRefs(useJobsStore());
</script>

