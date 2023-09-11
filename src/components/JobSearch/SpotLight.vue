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

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const SpotLights = ref([])
onMounted(async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const response = await axios.get(`${baseUrl}/SpotLights`)
  SpotLights.value = response.data
})
</script>

