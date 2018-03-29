# vue-requests

[![Version](https://img.shields.io/npm/v/vue-requests.svg)](#)
[![Build](https://travis-ci.org/nickforddesign/vue-requests.svg?branch=master)](#)
[![Coverage Status](https://coveralls.io/repos/github/nickforddesign/vue-requests/badge.svg?branch=master)](https://coveralls.io/github/nickforddesign/vue-requests?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Why?

The [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is awesome. For anyone who has worked with the [XMLHttpRequest api](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest), it's pretty clear that fetch is a big improvement. However, there are a few paint points to using it by itself:

1. No timeout option, or hook
1. No before hook
1. Having to parse the response body on every request
1. No way to use relative urls that differ from the client domain
1. Having to use `JSON.stringify` on every request body

This plugin is a small Vue.js wrapper for the fetch api, with some improvements to make those points less painful.

## Installation

``` bash
npm install vue-requests
# or using yarn
yarn add vue-requests
```

## Setup

```js
import Vue from 'vue'
import VueRequests from 'vue-requests'

Vue.use(VueRequests)
```

## Usage

Simplest example of a get request (the default method) in a Single File Component

```js
export default {
  mounted() {
    this.$request('/data')
  }
}
```

Example of a post request with body

```js
export default {
  mounted() {
    this.$request('/data', {
      method: 'POST',
      body: {
        test: 123 // body will be automatically stringified
      }
    })
  }
}
```

# Options

### root [String]
The root option allows usage of relative urls for a domain that is different from the client domain. 

### headers [Object]
Headers can contain any custom headers you'd like to include in your requests. The values will be used as-is to create a `new Headers()` instance, unless the value is a function, in which case it will be evaluated first. Use functions for values that may change over time, such as Vuex state.

```js
import store from './store'

const options = {
  headers: {
    authorization() {
      return store.getters.auth_token
    },
    something: 'You can use strings too'
  }
}

Vue.use(VueRequests, options)
```

### before [Function]
This function will be run before making the request. Use async/wait or return a promise if you want to complete something asynchronous before continuing. This is particularly useful for checking if you have expired tokens and refreshing them before a request.

Here's a simplified example of using the before hook to check something before proceeding with the request:

```js
const expires = '2017-09-30T01:44:19.273Z'

const options = {
  async before() {
    if (new Date(expires) >= new Date()) {
      await refreshToken()
    }
  }
}

Vue.use(VueRequests, options)
```

### timeout [Function]
Timeout hook to fire in the event of a timeout.

```js
const options = {
  timeout() {
    alert('The request timed out.')
  }
}

Vue.use(VueRequests, options)
```

### timeout_duration [Number]
Duration in ms for fetch timeout limit.

```js
const options = {
  timeout_duration: 25000
}

Vue.use(VueRequests, options)
```

# Requests
The request function accepts the following parameters:

## url [String]
The base url to make relative requests from. If an absolute url is passed to the request function, this will be overriden.

## options [Object]
The options parameter accepts any of the options accepted by the [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), but the following 

1. method [String] - The method of the request (get (default), put, post, delete, options)
1. body [Object|String] - The body of the request
1. headers [Object] - Custom headers to add to the request

## Response Headers

If you need access to the response headers, you can pass the `responseHeaders` option to the request method, which will result in the promise being resolved with an object containing body and headers.

```js
this.$request('/data', {
  responseHeaders: true
})
.then(response => {
  console.log(response.body, response.headers)
})
```


## Build Setup

``` bash
# install dependencies
npm install

# serve demo at localhost:8080
npm start

# run tests with jest
npm test

# build dist version
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).