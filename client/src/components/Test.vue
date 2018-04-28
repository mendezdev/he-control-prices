<template>
  <h1>{{ title }}</h1>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Test',
    data () {
      return {
        title: 'This is some random html'
      }
    },
    mounted () {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => this.title = response.data.chartName)
    }
  }
</script>
