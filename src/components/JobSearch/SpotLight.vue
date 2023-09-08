<template>
  <ul>
    <li v-for="spotlight in SpotLights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SpotLight',
  data() {
    return {
      SpotLights: []
    }
  },
  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    const response = await axios.get(`${baseUrl}/spotlights`)
    this.SpotLights = response.data
  }
}
</script>

