<template>
  <HeaderContainer>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>
    <template #subtitle>
      <h2 class="my-4 s-full text-base font-light">
        It/s awsome working here. Why don't you come join us?
      </h2>
    </template>
  </HeaderContainer>
</template>

<script>
import HeaderContainer from '../components/Shared/HeaderContainer.vue'
export default {
  name: 'TeamsView',
  components: {
    HeaderContainer
  }
}
</script>

