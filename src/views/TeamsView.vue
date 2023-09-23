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
  <div class="flex max-w-screen-xl mx-auto my-5">
    <ul class="flex flex-wrap">
      <TeamCard v-for="team in teams" :key="team.id" :team="team"/>
    </ul>
  </div>
</template>

<script setup lang="ts">
import HeaderContainer from '../components/Shared/HeaderContainer.vue'
import TeamCard from '@/components/Team/TeamCard.vue';
import getTeams from '@/api/getTeams';
import { ref, onMounted } from 'vue'
import type { Team } from '@/api/types';
const teams = ref<Team[]>([])
onMounted(async () => {
  teams.value = await getTeams()
})
</script>

