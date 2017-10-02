import _ from 'lodash'
import Request from './request'
import { validateArgs } from './utils'

const defaults = {
  timeout_duration: 20000,
  timeout: false,
  headers: {},
  root: ''
}

const init = async (vm, _config) => {
  try {
    validateArgs(_config)
  } catch (error) {
    console.warn(error)
  }
  const config = _.merge({}, defaults, _config)
  vm.$request = async (url, options, hook) => {
    if (typeof config.before === 'function' && hook) {
      await config.before(vm)
    }
    return Request(url, options, config)
  }
}

export default (Vue, config) => ({
  beforeCreate() {
    init(this, config)
  }
})
