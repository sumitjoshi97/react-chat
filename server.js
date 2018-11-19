const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')
const keys = require('./keys')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: keys.chatkitInstance,
  key: keys.chatkitSecret
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const {username} = req.body

  chatkit.createUser({
    name: username,
    id: username
  })
  .then(() => res.sendStatus(201))
  .catch(err => {
    if (err.error_type === 'services/chatkit/user/user_already_exists') {
      res.sendStatus(200)
    } else {
      res.sendStatus(err.statusCode).json(err)
    }
  })
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
