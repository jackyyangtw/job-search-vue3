<template>
  <CollapsibleAccordion :header="header">
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
  </CollapsibleAccordion>
</template>

<script setup>
import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  header: {
    type: String,
    required: true
  },
  uniqueValues: {
    type: Set,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})

const router = useRouter()
const selectedVal = ref([])

const selectVal = () => {
  props.action(selectedVal.value)
  router.push({ name: 'JobResults' })
}
</script>
