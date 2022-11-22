const express = require('express');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const httpStatus = require('http-status');
const { jwtStrategy } = require('./config/passport');
const { rateLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const RestError = require('./utils/RestError');

// Setup our express server
const app = express();

// Middleware to enable gzip compression
app.use(compression());

// Middleware to parse json body (POST)
app.use(express.json());

// Middleware to sanitize incoming data
app.use(xss());
app.use(mongoSanitize());

// Middleware to enable cors, defaulting to all access right now
app.use(cors());
app.options('*', cors());

// Middleware for JWT authentication using passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Middleware to limit repeated failed requests
app.use('/auth', rateLimiter);

// Middleware to setup our Api routes
app.use('/', routes);

// Handle not found requests
app.use((req, res, next) => {
  console.error(req.url);
  next(new RestError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to RestError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
