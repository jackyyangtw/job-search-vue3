import axios from "axios"
import type { Team } from "@/api/types"

const getTeams = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const response = await axios.get<Team[]>(`${baseUrl}/teams`)
  return response.data
}

export default getTeams
