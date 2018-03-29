import { sleep, validateArgs } from '../utils'

export default (Vue, spyBefore, spyTimeout, Request) => {
  const app = new Vue()
  let current = -1
  const request = app.$request
  app.$request = jest.fn((...args) => {
    current++
    return request(...args)
  })

  describe('vue-requests', () => {
    fetch.mockResponseOnce(JSON.stringify({
      'foo': 'bar'
    }), {
      status: 200
    })

    it('should receive json from get request', async () => {
      const response = await app.$request('/', {
        mode: 'no-cors'
      })
      expect(response)
        .toEqual({
          foo: 'bar'
        })
    })

    it('should be passing the correct args', () => {
      expect(app.$request.mock.calls[current])
        .toEqual(['/', { mode: 'no-cors' }])
    })

    it('fetch should have received correct method GET', () => {
      expect(global.fetch.mock.calls[current][1].method)
        .toBe('GET')
    })

    it('fetch should have received other options', () => {
      expect(global.fetch.mock.calls[current][1].mode)
        .toBe('no-cors')
    })

    it('should fire the before hook', () => {
      expect(spyBefore.mock.calls.length)
        .toBe(1)
    })

    it('the before hook should have the vue instance applied', () => {
      expect(spyBefore.mock.calls[current][0])
        .toBeInstanceOf(Vue)
    })

    fetch.mockResponseOnce(JSON.stringify({
      'foo': 'bar'
    }), {
      status: 200
    })

    it('fetch should receive correct method POST', async () => {
      await app.$request('/', {
        method: 'POST',
        body: {
          test: true
        }
      })
      expect(global.fetch.mock.calls[current][1].method)
        .toBe('POST')
    })

    it('fetch should receive correct request body', () => {
      expect(global.fetch.mock.calls[current][1].body)
        .toEqual(JSON.stringify({
          test: true
        }))
    })

    it('fetch should receive correct header passed as property: one', () => {
      expect(global.fetch.mock.calls[current][1].headers.map.one)
        .toEqual(['test1'])
    })

    it('fetch should receive correct header passed as function: two', () => {
      expect(global.fetch.mock.calls[current][1].headers.map.two)
        .toEqual(['test2'])
    })

    it('fetch should not receive header passed as undefined: two', () => {
      expect('three' in global.fetch.mock.calls[current][1].headers.map)
        .toBe(false)
    })

    fetch.mockResponseOnce(JSON.stringify({
      'error': 'failed'
    }), {
      status: 500
    })

    it('should throw for a failed fetch', async () => {
      try {
        await app.$request('/')
      } catch (error) {
        expect(error)
          .toBeInstanceOf(Object)
      }
    })

    fetch.mockResponseOnce(JSON.stringify({
      'foo': 'bar'
    }), {
      status: 200
    })

    describe('Request function', () => {
      it('should be able to fetch as a standalone function', async () => {
        const response = await Request('test')
        expect(response)
          .toEqual({
            'foo': 'bar'
          })
      })
    })

    fetch.mockResponseOnce(JSON.stringify({
      'foo': 'bar'
    }), {
      status: 200
    })

    it('should not pass any headers if headers: false', async () => {
      await app.$request('test', {
        headers: false
      })
      expect(Object.keys(global.fetch.mock.calls[current][1].headers.map).length)
        .toBe(0)
    })

    fetch.mockResponseOnce(JSON.stringify({
      'foo': 'bar'
    }), {
      status: 200
    })

    it('should not pass any body if body is not provided', async () => {
      app.$request('test', {
        method: 'post'
      })
      expect(global.fetch.mock.calls[current][1].body)
        .toBe(undefined)
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

    it('should throw errors for invalid config', () => {
      expect(() => {
        validateArgs({
          root: 2344
        })
      })
      .toThrow('Expected parameter "root" to be of type "string", received "number"')

      expect(() => {
        validateArgs({
          before: null
        })
      })
      .toThrow('Expected parameter "before" to be of type "function", received "object"')

      expect(() => {
        validateArgs({
          timeout: 'test'
        })
      })
      .toThrow('Expected parameter "timeout" to be of type "function", received "string"')

      expect(() => {
        validateArgs({
          timeout_duration: null
        })
      })
      .toThrow('Expected parameter "timeout_duration" to be of type "number", received "object"')
    })
  })
}
