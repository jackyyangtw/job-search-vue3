<template>
  <CollapsibleAccordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li v-for="jobType in UNIQUE_JOB_TYPES" :key="jobType" class="h-8 w-1/2">
            <input
              v-model="selectedJobTypes"
              :id="jobType"
              :value="jobType"
              @change="selectJobType"
              type="checkbox"
              class="mr-3"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script>
import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue'
import { mapState, mapActions } from 'pinia'
import { useJobsStore, UNIQUE_JOB_TYPES } from '@/stores/jobs'
import { useUserStore, ADD_SELECTED_JOB_TYPE } from '@/stores/user'

export default {
  name: 'JobFiltersSidebarJobTypes',
  components: {
    CollapsibleAccordion
  },
  data() {
    return {
      selectedJobTypes: []
    }
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPE]),
    selectJobType() {
      this.ADD_SELECTED_JOB_TYPE(this.selectedJobTypes)
    }
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_JOB_TYPES])
  }
}
</script>
