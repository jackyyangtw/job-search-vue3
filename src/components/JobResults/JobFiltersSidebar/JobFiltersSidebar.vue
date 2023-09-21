<template>
  <SidebarLayout>

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
    
  </SidebarLayout>
</template>

<script setup lang="ts">
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFiltersSidebarPrompt from './JobFiltersSidebarPrompt.vue'
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue'
import JobFiltersSidebarSkill from './JobFiltersSidebarSkill.vue'
import SidebarLayout from '@/components/layouts/SidebarLayout.vue'
import JobFiltersSidebarLocations from './JobFiltersSidebarLocations.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const jobsStore = useJobsStore()
const { UNIQUE_ORGANIZATIONS, UNIQUE_JOB_TYPES } = storeToRefs(jobsStore)

const degreesStore = useDegreesStore()
const { UNIQUE_DEGREES } = storeToRefs(degreesStore)

const userStore = useUserStore()
const { ADD_SELECTED_ORGANIZATION, ADD_SELECTED_JOB_TYPE, ADD_SELECTED_DEGREE, UPDATE_SKILL_SEARCH_TERM,UPDATE_LOCATION_SEARCH_TERM } = userStore

const route = useRoute()
const parseSkillSearchTerm = () => {
  const role = route.query.role as string || ''
  UPDATE_SKILL_SEARCH_TERM(role)
}
const parseLocationSearchTerm = () => {
  const location = route.query.location as string || ''
  UPDATE_LOCATION_SEARCH_TERM(location)
}

onMounted(() => {
  parseSkillSearchTerm()
  parseLocationSearchTerm()
})

</script>

