<template>
  <img :src="imgUrl" class="h-8 w-8 rounded-3xl object-contain" alt="user profile image" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const imgUrl = ref('https://static.myfigurecollection.net/upload/items/1/1725876-5bb6f.jpg')
</script>

