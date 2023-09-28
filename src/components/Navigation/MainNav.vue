<template>
  <header class="w-full text-sm" :class="headerHeight" ref="mainNavRef">
    <div class="fixed z-10 top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8 py-3"
      >
        <router-link to="/" class="flex h-full items-center text-xl">Vue Career</router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li class="ml-9 first:ml-0 h-full" v-for="item in menuItems" :key="item.text">
              <router-link :to="item.url" class="flex h-full items-center py-2.5">{{
                item.text
              }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <ActionButton @click="login" v-if="!isLoggedIn"></ActionButton>
          <ProfileImage v-else />
        </div>
      </div>
      <TheSubnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from './ProfileImage.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useUserStore } from '@/stores/user'
import { useUIStore } from '@/stores/ui'
import { useElementSize } from '@vueuse/core'

const menuItems = ref([
  { text: 'Teams', url: '/teams' },
  // { text: 'Locations', url: '/' },
  // { text: 'Life at Vue Corp', url: '/' },
  // { text: 'How we hire', url: '/' },
  // { text: 'Students', url: '/' },
  { text: 'Jobs', url: '/jobs/results' }
])

const userStore = useUserStore()
const { login } = userStore
const isLoggedIn = computed(() => userStore.isLoggedIn)
const headerHeight = computed(() => {
  return {
    'h-16': !isLoggedIn.value,
    'h-32': isLoggedIn.value
  }
})

const mainNavRef = ref<HTMLElement | null>(null)
const uiStore = useUIStore()
const { getMainNavHeight } = uiStore
onMounted(() => {
  const mainNavHeight = mainNavRef.value?.offsetHeight as number
  getMainNavHeight(mainNavHeight)
})

</script>
