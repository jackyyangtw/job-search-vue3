<template>
  <CollapsibleAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li v-for="organization in UNIQUE_ORGANIZATIONS" :key="organization" class="h-8 w-1/2">
            <input
              v-model="selectedOrganizations"
              :id="organization"
              :value="organization"
              @change="selectOrganization"
              type="checkbox"
              class="mr-3"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script>
import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue'
import { mapState, mapActions } from 'pinia'
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs'
import { useUserStore, ADD_SELECTED_ORGANIZATION } from '@/stores/user'

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: {
    CollapsibleAccordion
  },
  data() {
    return {
      selectedOrganizations: []
    }
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATION]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATION(this.selectedOrganizations)
    }
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS])
  }
}
</script>
