
// import _ from 'lodash'
import _merge from 'lodash.merge'
import 'whatwg-fetch'
import { handleXHRErrors, processHeaders } from './utils'

const defaults = () => {
  return {
    method: 'GET',
    body: undefined,
    headers: {}
  }
}

// generic, unauthenticated XHR

export default function Request(
  url = '',
  _options = {},
  config = {}
) {
  const options = _merge({}, defaults(), _options)
  const body = options.body
    ? JSON.stringify(body)
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
    .then(handleXHRErrors),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('request_timeout')
      }, config.timeout_duration)
    })
  ])
  race.catch((err) => {
    if (err === 'request_timeout') {
      config.timeout()
    }
  })
  return race
}
