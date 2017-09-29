import _ from 'lodash'

export function validateArgs (options) {
  const functions = {
    before: options.before,
    timeout: options.timeout
  }
  const strings = {
    root: options.root
  }
  const objects = {
    headers: options.headers
  }

  for (let key in functions) {
    const type = typeof functions[key]
    if (type !== 'function') {
      throw new TypeError(`Expected parameter "${key}" to be a function, received ${type}`)
    }
  }

  for (let key in strings) {
    const type = typeof strings[key]
    if (type !== 'string') {
      throw new TypeError(`Expected parameter "${key}" to be a string, received ${type}`)
    }
  }

  for (let key in objects) {
    const type = typeof objects[key]
    if (type !== 'object') {
      throw new TypeError(`Expected parameter "${key}" to be an object, received ${type}`)
    }
  }
}

export async function handleXHRErrors (response) {
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

export function processHeaders (default_headers, passed_headers) {
  let headers = _.merge({}, default_headers, passed_headers)

  for (let key in headers) {
    if (typeof headers[key] === 'function') {
      headers[key] = headers[key]()
    }
  }
  headers = _.pickBy(headers, _.identity)
  return new Headers(headers)
}
