import VueRequests from '../index'
import Vue from 'vue'

import { sleep } from '../utils'

const spyBefore = jest.fn()
const spyTimeout = jest.fn()

Vue.use(VueRequests, {
  before() {
    spyBefore(this)
  },
  timeout() {
    spyTimeout(this)
  },
  timeout_duration: 1000
})

const app = new Vue()

describe('vue-requests', () => {
  fetch.mockResponseOnce(JSON.stringify({
    'foo': 'bar'
  }), {
    status: 200
  })

  it('should get json', () => {
    expect.assertions(1)
    return app.$request('/')
      .then(response => {
        expect(response)
          .toEqual({
            foo: 'bar'
          })
      })
  })

  it('should fire the before hook', () => {
    expect(spyBefore.mock.calls.length)
      .toBe(1)
  })

  it('the before hook should have the vue instance applied', () => {
    expect(spyBefore.mock.calls[0][0])
      .toBeInstanceOf(Vue)
  })

  fetch.mockResponseOnce(JSON.stringify({
    'error': 'failed'
  }), {
    status: 500
  })

  it('should throw for a failed fetch', () => {
    expect.assertions(1)
    return app.$request('/')
      .catch(error => {
        expect(error)
          .toBeInstanceOf(Object)
      })
  })

  it('should timeout a request per timeout_duration', () => {
    global.fetch = async (...args) => {
      await sleep(2000)
      return Promise.resolve('You will never get this')
    }
    expect.assertions(1)
    return app.$request('/')
      .catch(error => {
        expect(error)
          .toBe('request_timeout')
      })
  })

  it('should fire the timeout hook', () => {
    expect(spyTimeout.mock.calls.length)
      .toBe(1)
  })

  it('the timeout hook should have the vue instance applied', () => {
    expect(spyTimeout.mock.calls[0][0])
      .toBeInstanceOf(Vue)
  })
})
