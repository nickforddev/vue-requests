import 'whatwg-fetch'
import { processResponse, processHeaders } from './utils'
import default_config from './defaults'

const default_options = {
  method: 'GET',
  body: undefined,
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function Request(
  url = '',
  _options = {},
  _config = {}
) {
  const options = Object.assign({}, default_options, _options)
  const config = Object.assign({}, default_config, _config)
  const body = options.body && JSON.stringify(options.body)
  const { method } = options
  const headers = processHeaders(config.headers, options.headers)

  if (!/^https?:\/\//i.test(url)) {
    url = config.root + url
  }
  const race = Promise.race([
    fetch(url, Object.assign({},
      options, {
        method,
        body,
        headers
      }
    ))
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
