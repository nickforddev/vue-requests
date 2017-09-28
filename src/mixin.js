import _ from 'lodash'
import Request from './request'

const defaults = {
  timeout_duration: 20000,
  timeout: false,
  headers: {},
  root: ''
}

const init = (vm, _config) => {
  const config = _.merge({}, defaults, _config)
  vm.$request = async (url, options) => {
    if (typeof config.before === 'function') {
      await config.before()
    }
    return Request(url, options, config)
  }
}

export default (Vue, config) => ({
  beforeCreate() {
    init(this, config)
  }
})
