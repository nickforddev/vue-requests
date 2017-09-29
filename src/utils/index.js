import _ from 'lodash'

function isDef (item) {
  return item !== undefined
}

export function validateArgs (options = {}) {
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
  const numbers = {
    timeout_duration: options.timeout_duration
  }

  for (let key in functions) {
    const type = typeof functions[key]
    if (isDef(functions[key]) && type !== 'function') {
      throw new TypeError(`Expected parameter "${key}" to be a function, received ${type}`)
    }
  }

  for (let key in strings) {
    const type = typeof strings[key]
    if (isDef(strings[key]) && type !== 'string') {
      throw new TypeError(`Expected parameter "${key}" to be a string, received ${type}`)
    }
  }

  for (let key in objects) {
    const type = typeof objects[key]
    if (isDef(objects[key]) && type !== 'object') {
      throw new TypeError(`Expected parameter "${key}" to be an object, received ${type}`)
    }
  }

  for (let key in numbers) {
    const type = typeof numbers[key]
    if (isDef(numbers[key]) && type !== 'number') {
      throw new TypeError(`Expected parameter "${key}" to be an number, received ${type}`)
    }
  }
}

export async function handleXHRErrors (response) {
  console.log({response})
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
