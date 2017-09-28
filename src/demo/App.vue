<template>
  <div id="app">
    <button @click="test('get')">Get</button>
    <button @click="test('put')">Put</button>
    <button @click="test('post')">Post</button>
    <button @click="test('delete')">Delete</button>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    test(method) {
      this.$request('/thing', {
        method
      })
        .then(response => {
          console.log({response})
        })
        .catch(err => {
          console.warn(err)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
