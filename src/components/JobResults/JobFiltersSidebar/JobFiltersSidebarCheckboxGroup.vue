<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-wrap">
        <li v-for="val in uniqueValues" :key="val" class="h-8 w-1/2">
          <input
            v-model="selectedVal"
            :id="val"
            :value="val"
            @change="selectVal"
            type="checkbox"
            class="mr-3"
          />
          <label :for="val">{{ val }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user"

const props = defineProps<{
  uniqueValues: Set<string>
  action: (selectedVal: string[]) => void
}>()

const router = useRouter()
const selectedVal = ref<string[]>([])

const selectVal = () => {
  props.action(selectedVal.value)
  router.push({ name: "JobResults" })
}

const userStore = useUserStore()
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === "CLEAR_USER_JOB_FILTER_SELECTIONS") {
      selectedVal.value = []
    }
  })
})
</script>
