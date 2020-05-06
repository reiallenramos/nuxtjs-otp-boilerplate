const express = require('express')
const consola = require('consola')
const morgan = require('morgan')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser');
const models = require('./models')
const seeds = require('./seeds.json')

app.use(bodyParser.json());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.use(morgan('tiny'))

const sessions = require('./routes/api/auth/sessions');
const register = require('./routes/register');

app.use('/api/auth/sessions', sessions);
app.use('/api/register', register);

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  models.connectDb().then(async () => {
    if(process.env.NODE_ENV !== 'production')  { seedUsers() }

    // Listen the server
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  });
}
start()

const seedUsers = function() {
  seeds.users.forEach(async user => {
    try {
      const u = new models.User(user);
      await u.save();
    } catch {
      console.log(`email already exists: ${user.email}`)
    }
  })
}
