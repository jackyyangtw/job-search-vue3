import axios from "axios"
import type { SpotLight } from "@/api/types"

const getSpotlight = async () => {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    const response = await axios.get<SpotLight[]>(`${baseUrl}/spotlights`)
    return response.data
}

export default getSpotlight
