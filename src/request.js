
import 'whatwg-fetch'
import { mergeDeepRight } from 'ramda'
import { processResponse, processHeaders } from './utils'
import defaults from './defaults'

const default_options = {
  method: 'GET',
  body: undefined,
  headers: {}
}

// generic, unauthenticated XHR

export default function Request(
  url = '',
  _options = {},
  _config = {}
) {
  // const options = _merge({}, defaults(), _options)
  const options = mergeDeepRight(default_options, _options)
  const config = mergeDeepRight(defaults, _config)
  const body = options.body
    ? JSON.stringify(options.body)
    : undefined

  const method = options.method
  const headers = processHeaders(config.headers, options.headers)

  if (!/^https?:\/\//i.test(url)) {
    url = config.root + url
  }
  const race = Promise.race([
    fetch(url, {
      method,
      body,
      headers
    })
    .then(response => {
      return processResponse(response, options)
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('request_timeout')
      }, config.timeout_duration)
    })
  ])
  race.catch((err) => {
    if (err === 'request_timeout') {
      if (typeof config.timeout === 'function') {
        config.timeout.apply(config.vm)
      }
    }
  })
  return race
}
