const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const libraryRoute = require('./library.route');
const photoRoute = require('./photo.route');

const router = express.Router();

const defaultRoutes = [
  { path: '/token', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/libraries', route: libraryRoute },
  { path: '/photos', route: photoRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
