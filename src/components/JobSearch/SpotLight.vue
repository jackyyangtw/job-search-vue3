<template>
  <ul>
    <li v-for="spotlight in SpotLights" :key="spotlight.id">
      <SpotlightSkelton v-if="isLoading"/>
      <slot
        v-if="!isLoading"
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
        :querys="spotlight.querys"
      ></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import axios, { Axios, type AxiosPromise } from 'axios'
import { onMounted, ref } from 'vue'
import SpotlightSkelton from './SpotlightSkelton.vue';
interface SpotLight {
  id: number
  img: string
  title: string
  description: string
  querys: string[]
}

const isLoading = ref(true)
const SpotLights = ref<SpotLight[]>([])
onMounted(async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  try {
    const res = await axios.get(`${baseUrl}/spotlights`)
    SpotLights.value = res.data
    setTimeout(() => {
      isLoading.value = false
    }, 1000);
  } catch (error) {
    console.log(error)
  } 
})
</script>

