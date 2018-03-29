<template>
  <div id="app">
    <h2>vue-requests</h2>
    <p>The following is a basic demo of the vue-requests plugin. There is a demo express server running on port <strong>{{ port }}</strong>, set up to respond to basic requests.</p>
    <button @click="test('get')">Get</button>
    <button @click="test('put')">Put</button>
    <button @click="test('post')">Post</button>
    <button @click="test('delete')">Delete</button>
    <button @click="postWithBody">Post with body</button>
    <button @click="getWithHeaders">Get with response headers</button>
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
      error: null,
      headers: null
    }
  },
  computed: {
    display() {
      return this.error
        ? this.error
        : this.response
          ? this.headers
            ? `From server:

${JSON.stringify(this.headers, null, '  ')}`
            : `From server:

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
        this.headers = null
      })
      .catch(() => {
        this.error = 'Cannot communicate with server'
      })
    },
    async postWithBody() {
      const response = await this.$request('/', {
        method: 'POST',
        body: {
          test: true
        }
      })
      this.response = response
      this.error = null
      this.headers = null
    },
    getWithHeaders() {
      this.$request('/', {
        responseHeaders: true
      })
      .then(response => {
        this.response = response.body
        this.headers = Array.from(response.headers)
        console.log(response.headers)
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
  color: #2c3e50;
  padding: 0 30px;
  width: 500px;
  max-width: 100%;
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
