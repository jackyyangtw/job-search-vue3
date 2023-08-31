<template>
  <header class="w-full text-sm" :class="headerHeight">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8 py-3"
      >
        <a :href="url" class="flex h-full items-center text-xl">{{ company }}</a>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li class="ml-9 first:ml-0 h-full" v-for="item in menuItems" :key="item">
              <a href="" class="flex h-full items-center py-2.5">{{ item }}</a>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <ActionButton @click="logIn" v-if="!isLoggedIn"></ActionButton>
          <ProfileImage v-else />
        </div>
      </div>
      <TheSubnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from './ActionButton.vue'
import ProfileImage from './ProfileImage.vue'
import TheSubnav from './TheSubnav.vue'
export default {
  name: 'MainNav',
  components: { ActionButton, ProfileImage, TheSubnav },
  props: {},
  data() {
    return {
      company: 'Bobo Career',
      url: 'https://careers.google.com/',
      menuItems: ['Teams', 'Locations', 'Life at Bobo Corp', 'How we hire', 'Students'],
      isLoggedIn: false
    }
  },
  computed: {
    headerHeight() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    logIn() {
      this.isLoggedIn = true
    }
  }
}
</script>
