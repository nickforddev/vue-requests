import { mergeDeepRight } from 'ramda'
import Request from './request'
import { validateArgs } from './utils'
import defaults from './defaults'

const init = async (vm, _config) => {
  validateArgs(_config)

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
