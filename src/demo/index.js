import Vue from 'vue'
import App from './demo'
// import VueRequest from '../../dist/vue-requests.js'
import VueRequest from '../index'

const { port } = require('./config')

Vue.config.productionTip = false

const token = 'test'

Vue.use(VueRequest, {
  root: `http://localhost:${port}`,
  headers: {
    Access() {
      return token
    },
    Refresh: 'test_refresh_token'
  },
  before() {
    console.log('fire this before')
  },
  timeout() {
    console.log('fire this on timeout')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
