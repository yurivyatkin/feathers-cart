const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const mongodb = require('./mongodb');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoDBStore({
  uri: app.get('mongodb'),
  collection: app.get('sessions'),
});
app.use(
  session({
    secret: app.get('secret'),
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    store: sessionStore,
    cookie: {
      maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days, in milliseconds
    },
  })
);

// Set up Plugins and providers
app.configure(express.rest());

app.configure(mongodb);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

app.get('/', (req, res) => { res.json({ message: 'This is the root of a headless API' }); });

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ html: false, logger }));

app.hooks(appHooks);

module.exports = app;
