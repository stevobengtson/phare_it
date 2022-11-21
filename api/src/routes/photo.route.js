const express = require('express');
const photoController = require('../controllers/photo.controller');
const photoValidation = require('../validations/photo.validation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/:photoId', validate(photoValidation.getPhoto), photoController.getPhoto);

module.exports = router;
