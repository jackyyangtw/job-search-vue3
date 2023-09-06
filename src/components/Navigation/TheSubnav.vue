<template>
  <div class="h-16 w-full border-b border-solid border-brand-grey-1 bg-white">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1">1653</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSubnav',
  components: {},
  props: {},
  data() {
    return {
      // onJobResultsPage: true
    }
  },
  computed: {
    onJobResultsPage() {
      return this.$route.name === 'JobResults'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>