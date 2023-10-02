import { computed, onMounted, ref, watch, type Ref } from "vue"
import { useJobsStore } from "@/stores/jobs"
import { storeToRefs } from "pinia"
import { useElementSize } from "@vueuse/core"

export const useRelatedLocation = (el: Ref, location: Ref) => {
    // fetch jobs and get unique locations
    const jobsStore = useJobsStore()
    const { jobs, UNIQUE_LOCATIONS } = storeToRefs(jobsStore)
    onMounted(async () => {
        if (jobs.value.length === 0) {
            await jobsStore.FETCH_JOBS()
        }
    })

    // filter unique locations
    const filered_UNIQUE_LOCATIONS = computed(() => {
        if (!location.value) return []
        if (!UNIQUE_LOCATIONS.value) return []
        return Array.from(UNIQUE_LOCATIONS.value).filter((LOCATION) =>
            LOCATION.toLowerCase().includes(location.value.toLowerCase())
        )
    })

    // show related location
    const showRelatedLocation = ref(false)
    const selectedLocation = ref("")
    const setLocation = (LOCATION: string) => {
        location.value = LOCATION
        selectedLocation.value = LOCATION
        showRelatedLocation.value = false
    }
    watch(location, (newVal) => {
        if (newVal === selectedLocation.value || filered_UNIQUE_LOCATIONS.value.length === 0) {
            showRelatedLocation.value = false
        } else {
            showRelatedLocation.value = true
        }
    })

    // related location style
    const relatedLoactionRef = ref<HTMLElement | null>(null)
    const elementHeight = ref(0)
    onMounted(() => {
        relatedLoactionRef.value = el.value?.relatedLoactionRef
        const { height } = useElementSize(relatedLoactionRef.value)
        watch(height, () => {
            elementHeight.value = height.value
        })
    })
    // height.value = elHeight.value
    const relatedLocationRefPos = computed(() => {
        if (!relatedLoactionRef.value) return {}
        return {
            bottom: `-${elementHeight.value + 5}px`
        }
    })

    return {
        setLocation,
        selectedLocation,
        filered_UNIQUE_LOCATIONS,
        relatedLocationRefPos,
        showRelatedLocation,
        elementHeight
    }
}
