const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const libraryRoute = require('./library.route');

const router = express.Router();

const defaultRoutes = [
  { path: '/token', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/libraries', route: libraryRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
