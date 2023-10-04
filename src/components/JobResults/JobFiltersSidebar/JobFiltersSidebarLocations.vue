<template>
  <div class="mt-2 relative">
    <LocationInput
      :location="locationSearchTerm"
      :relatedLocationRefPos="relatedLocationRefPos"
      :height="elementHeight"
      :showRelatedLocation="showRelatedLocation"
      :setLocation="setLocation"
      :filered_UNIQUE_LOCATIONS="filered_UNIQUE_LOCATIONS"
      v-model="locationSearchTerm"
      ref="locationInputRef"
      boxShadow
      @inputBlur="blurHandler"
    ></LocationInput>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from "vue"
import { useUserStore } from "@/stores/user"
import LocationInput from "@/components/Shared/LocationInput.vue"
import { useRelatedLocation } from "@/composables/useRelatedLocation"
const userStore = useUserStore()

const locationSearchTerm = ref("")
if (locationSearchTerm.value === "") {
  locationSearchTerm.value = userStore.locationSearchTerm
}

const blurHandler = () => {
  userStore.UPDATE_LOCATION_SEARCH_TERM(locationSearchTerm.value)
}

const locationInputRef = ref<HTMLElement | null>(null)
const {
  relatedLocationRefPos,
  showRelatedLocation,
  setLocation,
  elementHeight,
  filered_UNIQUE_LOCATIONS
} = useRelatedLocation(locationInputRef as Ref<HTMLElement>, locationSearchTerm)
</script>
