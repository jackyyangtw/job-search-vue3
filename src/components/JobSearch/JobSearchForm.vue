<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border0solid border-brand-gray-3"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3"></font-awesome-icon>
    <div class="relative flex h-full flex-1 items-center pr-3">
      <label for="role" class="absolute left-0 -top-10">Role</label>
      <TextInput id="role" placeholder="Software engineer" v-model="role"></TextInput>
    </div>
    <span
      class="flex h-full items-center border-1 border-r border-l border-brand-gray-3 bg-brand-gray-2 px-3"
      >in</span
    >
    <div class="relative flex h-full flex-1 items-center pl-3">
      <label for="location" class="absolute left-0 -top-10">Where?</label>
      <TextInput id="location" placeholder="Los Angeles" v-model="location"></TextInput>
    </div>
    <ActionButton text="Search" type="secondary" class="rounded-r-3xl"></ActionButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ActionButton from '../Shared/ActionButton.vue'
import TextInput from '../Shared/TextInput.vue'

const router = useRouter()
const role = ref('')
const location = ref('')
const searchForJobs = () => {
  if(!role.value && !location.value) return;
  router.push({
    name: 'JobResults',
    query: {
      role: role.value,
      location: location.value
    }
  })
}
</script>
