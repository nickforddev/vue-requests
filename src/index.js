import makeMixin from './mixin'

export default class VueRequest {
  static install(Vue, options) {
    Vue.mixin(makeMixin(Vue, options))
  }
}
