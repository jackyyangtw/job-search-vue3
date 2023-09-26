<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <section class="pb-5">
      <slot></slot>
    </section>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const SidebarLayoutRef = ref<HTMLElement | null>(null)
defineExpose({
  SidebarLayoutRef
})
</script>