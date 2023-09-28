import { defineStore } from "pinia"
import { ref } from "vue"
export const useUIStore = defineStore("ui", () => {
    const mainNavHeight = ref(0)
    const getMainNavHeight = (value: number) => {
        mainNavHeight.value = value
    }
    return {
        mainNavHeight,
        getMainNavHeight
    }
})
