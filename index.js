const express = require('express')
const bodyParser = require('body-parser')
const Chatkit = require('@pusher/chatkit-server')
const keys = require('./keys')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: keys.chatkitInstance,
  key: keys.chatkitSecret
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/test', (req, res) => {
  res.send('server test route running')
})

app.post('/users', (req, res) => {
  const { username } = req.body

  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/auth', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  })
  res.status(authData.status).send(authData.body)
})

if (process.env.NODE_ENV === 'production') {
  // express will serve production client build code
  app.use(express.static('build'))

  //express will serve index.html file if route is not defined in its API
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 3000

app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
