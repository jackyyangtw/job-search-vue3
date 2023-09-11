<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary"></ActionButton>
        </div>
      </div>

      <JobFiltersSidebarCheckboxGroup
        header="Job Types"
        :unique-values="UNIQUE_JOB_TYPES"
        :action="ADD_SELECTED_JOB_TYPE"
      />
      <JobFiltersSidebarCheckboxGroup
        header="Organizations"
        :unique-values="UNIQUE_ORGANIZATIONS"
        :action="ADD_SELECTED_ORGANIZATION"
      />
    </section>
  </div>
</template>

<script setup>
import ActionButton from '../../Shared/ActionButton.vue'
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue'
import { useJobsStore } from '../../../stores/jobs'
import { useUserStore } from '../../../stores/user'
import { storeToRefs } from 'pinia'

const jobsStore = useJobsStore()
const { UNIQUE_ORGANIZATIONS, UNIQUE_JOB_TYPES } = storeToRefs(jobsStore)

const userStore = useUserStore()
const { ADD_SELECTED_ORGANIZATION, ADD_SELECTED_JOB_TYPE } = userStore
</script>

