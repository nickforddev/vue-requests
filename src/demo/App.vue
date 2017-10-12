<template>
  <div id="app">
    <h2>vue-requests</h2>
    <p>The following is a basic demo of the vue-requests plugin. There is a demo express server running on port <strong>{{ port }}</strong>, set up to respond to basic requests.</p>
    <button @click="test('get')">Get</button>
    <button @click="test('put')">Put</button>
    <button @click="test('post')">Post</button>
    <button @click="test('delete')">Delete</button>
    <pre>{{ display }}</pre>
  </div>
</template>

<script>
const { port } = require('./config')

export default {
  name: 'app',
  data() {
    return {
      port,
      response: null,
      error: null
    }
  },
  computed: {
    display() {
      return this.error
        ? this.error
        : this.response
          ? `
From server:

${JSON.stringify(this.response, null, '  ')}`
          : 'Click a button to send request'
    }
  },
  methods: {
    test(method) {
      this.$request('/', {
        method
      })
      .then(response => {
        this.response = response
        this.error = null
        // alert(`Server responded correctly: ${response.message}`)
      })
      .catch(() => {
        this.error = 'Cannot communicate with server'
        // console.warn(err)
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
  /* text-align: center; */
  color: #2c3e50;
  padding: 0 30px;
  width: 500px;
  max-width: 100%;
  /* margin-top: 60px; */
}

pre {
  background: #37373e;
  color: #a4ffd2;
  padding: 14px;
  border-radius: 4px;
  font-family: 'Inconsolata', monospace;
  font-size: 13px;
}
</style>
