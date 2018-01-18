import { sleep, validateArgs } from '../utils'

export default (Vue, spyBefore, spyTimeout, Request) => {
  const app = new Vue()

  // spy on app.$request
  const request = app.$request
  app.$request = jest.fn((...args) => {
    return request(...args)
  })

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

    it('should be passing the correct args', () => {
      expect(app.$request.mock.calls[0])
        .toEqual(['/'])
    })

    it('fetch should have received correct method GET', () => {
      expect(global.fetch.mock.calls[0][1].method)
        .toBe('GET')
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
      'foo': 'bar'
    }), {
      status: 200
    })

    it('fetch should receive correct method POST', () => {
      expect.assertions(1)
      return app.$request('/', {
        method: 'POST',
        body: {
          test: true
        }
      })
        .then(() => {
          expect(global.fetch.mock.calls[1][1].method)
            .toBe('POST')
        })
    })

    it('fetch should receive correct body', () => {
      expect(global.fetch.mock.calls[1][1].body)
        .toEqual(JSON.stringify({
          test: true
        }))
    })

    it('fetch should receive correct header passed as property: one', () => {
      expect(global.fetch.mock.calls[1][1].headers.map.one)
        .toEqual(['test1'])
    })

    it('fetch should receive correct header passed as function: two', () => {
      expect(global.fetch.mock.calls[1][1].headers.map.two)
        .toEqual(['test2'])
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

    fetch.mockResponseOnce(JSON.stringify({
      'foo': 'bar'
    }), {
      status: 200
    })

    describe('Request function', () => {
      it('should be able to fetch as a standalone function', async () => {
        expect.assertions(1)
        const response = await Request('test')
        expect(response)
          .toEqual({
            'foo': 'bar'
          })
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

    it('should throw errors for invalid config', () => {
      expect(() => {
        validateArgs({
          root: 2344
        })
      })
      .toThrow('Expected parameter "root" to be a string, received number')
    })
  })
}
