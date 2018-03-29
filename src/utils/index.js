function isDef (item) {
  return item !== undefined
}

function pickBy (test, obj) {
  const output = {}
  for (let key in obj) {
    if (test(obj[key])) {
      output[key] = obj[key]
    }
  }
  return output
}

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function validateArgs (options = {}) {
  const {
    before,
    timeout,
    root,
    headers,
    timeout_duration
  } = options

  const params = {
    string: {
      root
    },
    number: {
      timeout_duration
    },
    function: {
      before,
      timeout
    },
    object: {
      headers
    }
  }

  for (let type_key in params) {
    for (let key in params[type_key]) {
      const param_value = params[type_key][key]
      const type = typeof param_value
      if (isDef(param_value) && type !== type_key) {
        throw new TypeError(
          `Expected parameter "${key}" to be of type "${type_key}", received "${type}"`
        )
      }
    }
  }
}

export async function processResponse (response, options = {}) {
  const text = await response.text()
  try {
    const json = JSON.parse(text)
    if (!response.ok) {
      return Promise.reject(json)
    } else {
      return options.responseHeaders
        ? { body: json, headers: response.headers.entries() }
        : json
    }
  } catch (error) {
    return Promise.reject(text)
  }
}

export function processHeaders (default_headers, passed_headers) {
  let headers = passed_headers === false
    ? {}
    : Object.assign({}, default_headers, passed_headers)

  for (let key in headers) {
    if (typeof headers[key] === 'function') {
      headers[key] = headers[key]()
    }
  }
  headers = pickBy(isDef, headers)
  return new Headers(headers)
}
