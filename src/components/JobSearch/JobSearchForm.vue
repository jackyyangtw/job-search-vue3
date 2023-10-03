<template>
  <form class="2xl:flex"
    @submit.prevent="searchForJobs"
  >
    <div class="relative flex w-full h-full items-center pr-3 border border-solid border-brand-gray-3 p-3 rounded-full 2xl:mr-5">
      <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3"></font-awesome-icon>
      <label for="role" class="absolute left-0 -top-10">Role</label>
      <TextInput id="role" placeholder="Software engineer" v-model="role"></TextInput>
    </div>
    <div class="relative flex w-full h-full items-center pr-3 border border-solid border-brand-gray-3 p-3 rounded-full mt-14 2xl:mt-0 2xl:mr-5">
      <font-awesome-icon :icon="['fas', 'location-dot']" class="ml-4 mr-3"/>
      <label for="location" class="absolute left-0 -top-10">Where?</label>
      <LocationInput :location="location" :relatedLocationRefPos="relatedLocationRefPos" :height="elementHeight" :showRelatedLocation="showRelatedLocation" :setLocation="setLocation" :filered_UNIQUE_LOCATIONS="filered_UNIQUE_LOCATIONS" v-model="location" ref="locationInputRef"></LocationInput>
    </div>
    <ActionButton text="Search" class="w-full bg-brand-blue-2 border border-solid border-brand-gray-3 rounded-full mt-10 2xl:mt-0 2xl:max-w-[150px]"></ActionButton>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ActionButton from '../Shared/ActionButton.vue'
import LocationInput from '../Shared/LocationInput.vue'
import { ref, type Ref } from 'vue'
import TextInput from '../Shared/TextInput.vue'
import { useRelatedLocation } from '@/composables/useRelatedLocation'

const location = ref('')
const locationInputRef = ref<HTMLElement|null>(null)
const { relatedLocationRefPos, showRelatedLocation, setLocation, elementHeight, filered_UNIQUE_LOCATIONS } = useRelatedLocation(locationInputRef as Ref<HTMLElement>, location)


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