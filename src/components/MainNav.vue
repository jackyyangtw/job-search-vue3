<template>
  <header clss="w-full text-sm">
    <div class="flxed top-0 left-0 h-16 w-full bg-white">
      <div class="mx-auto flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8">
        <a href="/" class="flex h-full items-center text-xl">{{ company }}</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainNav',
  components: {},
  props: {},
  data() {
    return {
      company: 'Bobo Career'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
