<template>
  <MainNav />
  <router-view></router-view>
</template>

<script>
import MainNav from '@/components/Navigation/MainNav.vue'
export default {
  components: {
    MainNav
  }
}
</script>

<style scoped>
</style>
