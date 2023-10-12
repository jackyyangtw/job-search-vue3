<template>
  <div class="mt-2">
    <div class="relative">
      <TextInput
        v-model.lazy="skillSearchTerm"
        id="skill"
        boxShadow
        placeholder="What do you want to do?"
        @clearInput="clearInputHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue"
import { useUserStore } from "@/stores/user"
import TextInput from "@/components/Shared/TextInput.vue"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const { UPDATE_SKILL_SEARCH_TERM } = userStore

const skillSearchTerm = computed({
  get: () => userStore.skillSearchTerm,
  set: (val) => {
    UPDATE_SKILL_SEARCH_TERM(val)
  }
})

const clearInputHandler = () => {
  skillSearchTerm.value = ""
}
</script>
