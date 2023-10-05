<template>
  <SidebarLayout>
    <div
      @click="emit('closeSidebar')"
      class="mobile-header flex lg:hidden w-full bg-white cursor-pointer py-3 items-center text-3xl"
    >
      <font-awesome-icon class="mr-5" :icon="['fas', 'circle-xmark']" />
      <h3>Filters</h3>
    </div>

    <JobFiltersSidebarPrompt />

    <JobFiltersSidebarSkill />

    <CollapsibleAccordion header="Organizations">
      <JobFiltersSidebarCheckboxGroup
        :unique-values="UNIQUE_ORGANIZATIONS"
        :action="ADD_SELECTED_ORGANIZATION"
      />
    </CollapsibleAccordion>

    <CollapsibleAccordion header="Location" :shouldOpenInitially="locationInputOpenInitally">
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

    <ActionButton class="lg:hidden mt-10" text="Done" @click="emit('closeSidebar')" />
  </SidebarLayout>
</template>

<script setup lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue"
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
import { ref, onMounted, type Ref, watchEffect, toRef } from "vue"
import { useRoute } from "vue-router"
import { useElementSize } from "@vueuse/core"

const jobsStore = useJobsStore()
const { UNIQUE_ORGANIZATIONS, UNIQUE_JOB_TYPES } = storeToRefs(jobsStore)

const degreesStore = useDegreesStore()
const { UNIQUE_DEGREES } = storeToRefs(degreesStore)

const userStore = useUserStore()
const { ADD_SELECTED_ORGANIZATION, ADD_SELECTED_JOB_TYPE, ADD_SELECTED_DEGREE } = userStore

const locationInputOpenInitally = ref(false)
const route = useRoute()
if (route.query.location) {
  locationInputOpenInitally.value = true
}
const emit = defineEmits(["closeSidebar"])
</script>
