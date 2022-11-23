const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const libraryValidation = require('../validations/library.validation');
const photoValidation = require('../validations/photo.validation');
const libraryController = require('../controllers/library.controller');
const photoController = require('../controllers/photo.controller');
const { uploadFiles } = require('../middlewares/upload');

const router = express.Router();

router
    .route('/')
    .post(auth('createLibrary'), validate(libraryValidation.createUser), libraryController.createLibrary);

router
    .route('/:libraryId')
    .get(validate(libraryValidation.getLibrary), libraryController.getLibrary);

router
    .route('/:libraryId/photos')
    .post(uploadFiles.single('file'), photoController.uploadPhoto);

router
    .route('/:libraryId/photos/:photoName')
    .delete( validate(photoValidation.deletePhoto), photoController.deletePhoto);

module.exports = router;
