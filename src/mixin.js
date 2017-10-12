import { mergeDeepRight } from 'ramda'
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
  const config = mergeDeepRight(
    mergeDeepRight({ vm }, defaults),
     _config
  )

  vm.$request = async (url, options, fire_hooks = true) => {
    if (typeof config.before === 'function' && fire_hooks) {
      await config.before.apply(vm)
    }
    return Request(url, options, config)
  }
}

export default (Vue, config) => ({
  beforeCreate() {
    init(this, config)
  }
})
