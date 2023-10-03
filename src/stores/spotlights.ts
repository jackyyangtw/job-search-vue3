import { defineStore } from "pinia"
import { ref } from "vue"
import type { SpotLight } from "@/api/types"
import getSpotlight from "../api/getSpotlight"

export const useSpotlightStore = defineStore("spotlights", () => {
    const spotlights = ref<SpotLight[]>([])
    const FETCH_SPOTLIGHTS = async () => {
        spotlights.value = await getSpotlight()
    }
    return {
        spotlights,
        FETCH_SPOTLIGHTS
    }
})
