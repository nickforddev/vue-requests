const express = require('express')
const cors = require('cors')

const { port } = require('./config')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  console.log('Received GET')
  res.send({
    message: 'Received GET'
  })
})

app.post('/', (req, res) => {
  console.log('Received POST')
  res.send({
    message: 'Received POST'
  })
})

app.put('/', (req, res) => {
  console.log('Received PUT')
  res.send({
    message: 'Received PUT'
  })
})

app.delete('/', (req, res) => {
  console.log('Received DELETE')
  res.send({
    message: 'Received DELETE'
  })
})

app.listen(port)

console.log(`Server listening on port '${port}'`)
