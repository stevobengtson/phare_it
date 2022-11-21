const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const libraryValidation = require('../validations/library.validation');
const libraryController = require('../controllers/library.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('createLibrary'), validate(libraryValidation.createUser), libraryController.createLibrary);

module.exports = router;
