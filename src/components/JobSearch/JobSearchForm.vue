<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border0solid border-brand-gray-3"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3"></font-awesome-icon>
    <div class="relative flex h-full flex-1 items-center pr-3">
      <label for="role" class="absolute left-0 -top-10">Role</label>
      <TextInput id="role" placeholder="Software engineer" v-model="role"></TextInput>
    </div>
    <span
      class="flex h-full items-center border-1 border-r border-l border-brand-gray-3 bg-brand-gray-2 px-3"
      >in</span
    >
    <div class="flex h-full flex-1 items-center pl-3 relative">
      <label for="location" class="absolute left-0 -top-10">Where?</label>
      <TextInput id="location" placeholder="Los Angeles" v-model="location">
        <template #related>
          <div class="bg-white w-full h-[300px] overflow-y-scroll absolute top-[-301px]" v-if="location && showRelatedLocation">
            <ul>
              <li @click="setLocation(LOCATION)" class="px-3 py-2" v-for="LOCATION in filered_UNIQUE_LOCATIONS" :key="LOCATION">{{ LOCATION }}</li>
            </ul>
          </div>
        </template>
      </TextInput>
    </div>
    <ActionButton text="Search" type="secondary" class="rounded-r-3xl"></ActionButton>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import ActionButton from '../Shared/ActionButton.vue'
import TextInput from '../Shared/TextInput.vue'
import { useJobsStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'

const jobsStore = useJobsStore()
const { jobs } = storeToRefs(jobsStore)
const UNIQUE_LOCATIONS = ref<Set<string>>()
onMounted(async () => {
  if(jobs.value.length === 0) await jobsStore.FETCH_JOBS()
  UNIQUE_LOCATIONS.value = jobsStore.UNIQUE_LOCATIONS
})

const router = useRouter()
const role = ref('')
const location = ref('')
const searchForJobs = () => {
  if(!role.value && !location.value) return;
  router.push({
    name: 'JobResults',
    query: {
      role: role.value,
      location: location.value
    }
  })
}

const filered_UNIQUE_LOCATIONS = computed(() => {
  if(!location.value) return []
  if(!UNIQUE_LOCATIONS.value) return []
  return Array.from(UNIQUE_LOCATIONS.value).filter(LOCATION => LOCATION.toLowerCase().includes(location.value.toLowerCase()))
})

const showRelatedLocation = ref(false)
const setLocation = (LOCATION: string) => {
  location.value = LOCATION
  showRelatedLocation.value = false
}
watch(location, (newVal) => {
  if(newVal.length > 0) {
    showRelatedLocation.value = true
  } else if(newVal.length === 0) {
    showRelatedLocation.value = false
  }
})
</script>
