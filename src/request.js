
import _ from 'lodash'
import 'whatwg-fetch'

// return error data from request

const handleXHRErrors = async (response) => {
  const text = await response.text()
  try {
    const json = JSON.parse(text)
    if (!response.ok) {
      return Promise.reject(json)
    } else {
      return json
    }
  } catch (error) {
    return Promise.reject(text)
  }
}

// generic, unauthenticated XHR

export default function Request(
  url = '',
  {
    method = 'GET',
    body,
    headers = {}
  } = {},
  config = {}
) {
  if (body) body = JSON.stringify(body)
  if (!/^https?:\/\//i.test(url)) {
    url = config.root + url
  }
  headers = _.pickBy(
    _.merge({}, config.headers, headers),
    _.identity
  )

  for (let key in headers) {
    headers[key] = headers[key]()
  }

  const race = Promise.race([
    fetch(url, {
      method,
      body,
      headers: new Headers(
        headers
      )
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
