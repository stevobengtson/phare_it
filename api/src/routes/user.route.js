const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const libraryValidation = require('../validations/library.validation');
const libraryController = require('../controllers/library.controller');

const router = express.Router();

router.post('/', validate(userValidation.createUser), userController.createUser);

router
  .route('/')
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

  router.get('/:userId/libraries', validate(libraryValidation.getLibraries), libraryController.getLibraries);


module.exports = router;
