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

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

interface SpotLight {
  id: number
  img: string
  title: string
  description: string
}

const SpotLights = ref<SpotLight[]>([])
onMounted(async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const response = await axios.get(`${baseUrl}/SpotLights`)
  SpotLights.value = response.data
})
</script>

