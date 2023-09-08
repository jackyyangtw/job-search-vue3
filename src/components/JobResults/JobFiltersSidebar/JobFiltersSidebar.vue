<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary"></ActionButton>
        </div>
      </div>
      <JobFiltersSidebarOrganizations></JobFiltersSidebarOrganizations>
      <JobFiltersSidebarJobTypes></JobFiltersSidebarJobTypes>
    </section>
  </div>
</template>

<script>
import ActionButton from '../../Shared/ActionButton.vue'
import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue'
import JobFiltersSidebarOrganizations from './JobFiltersSidebarOrganizations.vue'
import JobFiltersSidebarJobTypes from './JobFiltersSidebarJobTypes.vue'
export default {
  name: 'JobFiltersSidebar',
  components: {
    ActionButton,
    CollapsibleAccordion,
    JobFiltersSidebarOrganizations,
    JobFiltersSidebarJobTypes
  }
}
</script>

