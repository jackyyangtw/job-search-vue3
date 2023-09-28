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
      <TextInput id="location" placeholder="Los Angeles" autocomplete="off" v-model="location">
        <template #related>
          <transition name="fade">          
            <div class="bg-white w-full max-h-[300px] absolute shadow-md"
              :class="{'overflow-y-scroll': height >= 300}"
              :style="relatedLocationRefPos"
              ref="relatedLoactionRef"
              v-if="location && showRelatedLocation"
            >
              <ul>
                <li @click="setLocation(LOCATION)" class="px-3 py-2 cursor-pointer hover:bg-brand-gray-1/[0.3]" v-for="LOCATION in filered_UNIQUE_LOCATIONS" :key="LOCATION">{{ LOCATION }}</li>
              </ul>
            </div>
          </transition>
        </template>
      </TextInput>
      <!-- <LocationInput :location="location" :selectedLocation="selectedLocation"></LocationInput> -->
    </div>
    <ActionButton text="Search" type="secondary" class="rounded-r-3xl"></ActionButton>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ActionButton from '../Shared/ActionButton.vue'
import LocationInput from '../Shared/LocationInput.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useJobsStore } from '@/stores/jobs'
import { storeToRefs } from 'pinia'
import TextInput from '../Shared/TextInput.vue'

// fetch jobs and get unique locations
const jobsStore = useJobsStore()
const { jobs, UNIQUE_LOCATIONS } = storeToRefs(jobsStore)
// const UNIQUE_LOCATIONS = ref<Set<string>>()
onMounted(async () => {
  if(jobs.value.length === 0){
    await jobsStore.FETCH_JOBS()
    // UNIQUE_LOCATIONS.value = jobsStore.UNIQUE_LOCATIONS
  } 
})

// filter unique locations
const location = ref('')
const filered_UNIQUE_LOCATIONS = computed(() => {
  if(!location.value) return []
  if(!UNIQUE_LOCATIONS.value) return []
  return Array.from(UNIQUE_LOCATIONS.value).filter(LOCATION => LOCATION.toLowerCase().includes(location.value.toLowerCase()))
})

// show related location
const showRelatedLocation = ref(false)
const selectedLocation = ref('')
const setLocation = (LOCATION: string) => {
  location.value = LOCATION
  selectedLocation.value = LOCATION
  showRelatedLocation.value = false
}
watch(location, (newVal) => {
  if(newVal === selectedLocation.value || filered_UNIQUE_LOCATIONS.value.length === 0) {
    showRelatedLocation.value = false
  } else {
    showRelatedLocation.value = true
  }
})

// related location style
const relatedLoactionRef = ref<HTMLElement | null>(null)
const { height } = useElementSize(relatedLoactionRef)
const relatedLocationRefPos = computed(() => {
  if(!relatedLoactionRef.value) return {}
  return {
    bottom: `-${height.value + 5}px`,
  }
})
// search for jobs
const router = useRouter()
const role = ref('')
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

</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


</style>