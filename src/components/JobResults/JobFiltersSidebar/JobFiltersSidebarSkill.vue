<template>
  <div class="mt-2">
    <div class="relative">
      <TextInput
        v-model="localSkillSearchTerm"
        id="skill"
        boxShadow
        placeholder="What do you want to do?"
        @clearInput="clearInputHandler"
        @inputBlur="UPDATE_SKILL_SEARCH_TERM(localSkillSearchTerm)"
        @enterKey="UPDATE_SKILL_SEARCH_TERM(localSkillSearchTerm)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/stores/user"
import TextInput from "@/components/Shared/TextInput.vue"
import { useRoute } from "vue-router"

const userStore = useUserStore()
const { UPDATE_SKILL_SEARCH_TERM } = userStore

const localSkillSearchTerm = ref("")
const route = useRoute()
if (route.query.role) {
  localSkillSearchTerm.value = route.query.role as string
}

const clearInputHandler = () => {
  localSkillSearchTerm.value = ""
  UPDATE_SKILL_SEARCH_TERM("")
}
</script>
