<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="headlineClass">{{ headline }}</span> <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Bobo Corp.</h2>
  </section>
</template>

<script>
import { nextElementList } from '@/utils/nextElementList'
export default {
  name: 'TheHeadline',
  data() {
    return {
      headline: 'Build',
      timer: null
    }
  },
  computed: {
    headlineClass() {
      return {
        [this.headline.toLowerCase()]: true
      }
    }
  },
  methods: {
    changeHeadline() {
      const headlines = ['Build', 'Create', 'Design', 'Code']
      this.timer = setInterval(() => {
        this.headline = nextElementList(headlines, this.headline)
      }, 1000)
    }
  },
  created() {
    this.changeHeadline()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #fbbc05;
}
.code {
  color: #ea4335;
}
</style>

