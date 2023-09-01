<template>
  <form action="">Form</form>
</template>

<script>
export default {
  name: 'JobSearchForm',
  data() {
    return {
      jobTitle: '',
      location: '',
      fullTime: false
    }
  },
  methods: {
    submitForm() {
      console.log(this.jobTitle, this.location, this.fullTime)
    }
  }
}
</script>
