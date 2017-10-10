import makeMixin from './mixin'
import Request from './request'

export default class VueRequest {
  static install(Vue, options) {
    Vue.mixin(makeMixin(Vue, options))
  }
  static Request(...args) {
    return Request(...args)
  }
}
