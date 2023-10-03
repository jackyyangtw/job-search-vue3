<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
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
import { onMounted, ref } from 'vue'
import SpotlightSkelton from './SpotlightSkelton.vue';
import { useSpotlightStore } from '@/stores/spotlights'
import { storeToRefs } from 'pinia';

const isLoading = ref(true)
const spotlightStore = useSpotlightStore()
const { FETCH_SPOTLIGHTS } = spotlightStore
const { spotlights } = storeToRefs(spotlightStore)

onMounted(async () => {
  try {
    if(spotlights.value.length) {
      isLoading.value = false
    }
    if(!spotlights.value.length) {
      isLoading.value = true
      await FETCH_SPOTLIGHTS()
      setTimeout(() => {
        isLoading.value = false
      }, 1000);
    } 
  } catch (error) {
    console.log(error)
  }
})
</script>

