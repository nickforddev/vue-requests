import Vue from 'vue'
import App from './demo'
// import VueRequest from '../../dist/vue-requests.js'
import VueRequests from '../index'

// const { port } = require('./config')

Vue.config.productionTip = false

// const token = 'test'

Vue.use(VueRequests)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
