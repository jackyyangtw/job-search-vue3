<template>
  <SidebarLayout class="p-4">
    <JobFiltersSidebarPrompt />

    <JobFiltersSidebarSkill />

    <CollapsibleAccordion header="Organizations">
      <JobFiltersSidebarCheckboxGroup
        :unique-values="UNIQUE_ORGANIZATIONS"
        :action="ADD_SELECTED_ORGANIZATION"
      />
    </CollapsibleAccordion>

    <CollapsibleAccordion header="Location">
      <JobFiltersSidebarLocations />
    </CollapsibleAccordion>

    <CollapsibleAccordion header="Degrees">
      <JobFiltersSidebarCheckboxGroup
        :unique-values="UNIQUE_DEGREES"
        :action="ADD_SELECTED_DEGREE"
      />
    </CollapsibleAccordion>

    <CollapsibleAccordion header="Job Types">
      <JobFiltersSidebarCheckboxGroup
        :unique-values="UNIQUE_JOB_TYPES"
        :action="ADD_SELECTED_JOB_TYPE"
      />
    </CollapsibleAccordion>

    <slot name="mobile"></slot>
  </SidebarLayout>
</template>

<script setup lang="ts">
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue"
import JobFiltersSidebarPrompt from "./JobFiltersSidebarPrompt.vue"
import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue"
import JobFiltersSidebarSkill from "./JobFiltersSidebarSkill.vue"
import SidebarLayout from "@/components/layouts/SidebarLayout.vue"
import JobFiltersSidebarLocations from "./JobFiltersSidebarLocations.vue"
import { useJobsStore } from "@/stores/jobs"
import { useUserStore } from "@/stores/user"
import { useDegreesStore } from "@/stores/degrees"
import { storeToRefs } from "pinia"

const jobsStore = useJobsStore()
const { UNIQUE_ORGANIZATIONS, UNIQUE_JOB_TYPES } = storeToRefs(jobsStore)

const degreesStore = useDegreesStore()
const { UNIQUE_DEGREES } = storeToRefs(degreesStore)

const userStore = useUserStore()
const { ADD_SELECTED_ORGANIZATION, ADD_SELECTED_JOB_TYPE, ADD_SELECTED_DEGREE } = userStore
</script>
