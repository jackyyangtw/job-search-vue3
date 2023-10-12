<template>
  <div class="mt-2 relative">
    <LocationInput
      :location="localLocationSearchTerm"
      :relatedLocationRefPos="relatedLocationRefPos"
      :height="elementHeight"
      :showRelatedLocation="showRelatedLocation"
      :filered_UNIQUE_LOCATIONS="filered_UNIQUE_LOCATIONS"
      v-model="localLocationSearchTerm"
      ref="locationInputRef"
      boxShadow
      @clearInput="clearInputHandler"
      @setLocation="setLocationHandler"
    ></LocationInput>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch } from "vue"
import { useUserStore } from "@/stores/user"
import LocationInput from "@/components/Shared/LocationInput.vue"
import { useRelatedLocation } from "@/composables/useRelatedLocation"
import { useRoute } from "vue-router"

const userStore = useUserStore()

const localLocationSearchTerm = ref("")
const route = useRoute()
if (route.query.location) {
  localLocationSearchTerm.value = route.query.location as string
}
// click "Clear Filter" button and clear input
watch(
  () => userStore.locationSearchTerm,
  (newVal) => {
    if (newVal === "") {
      localLocationSearchTerm.value = ""
    }
  }
)

const locationInputRef = ref<HTMLElement | null>(null)
const {
  relatedLocationRefPos,
  showRelatedLocation,
  setLocation,
  elementHeight,
  filered_UNIQUE_LOCATIONS
} = useRelatedLocation(locationInputRef as Ref<HTMLElement>, localLocationSearchTerm)

const setLocationHandler = (location: string) => {
  setLocation(location)
  userStore.UPDATE_LOCATION_SEARCH_TERM(location)
}

const clearInputHandler = () => {
  localLocationSearchTerm.value = ""
  userStore.UPDATE_LOCATION_SEARCH_TERM("")
}
</script>
