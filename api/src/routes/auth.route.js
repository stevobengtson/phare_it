const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', validate(authValidation.login), authController.login);
router.delete('/', validate(authValidation.logout), authController.logout);
router.patch('/', validate(authValidation.refreshTokens), authController.refreshTokens);

module.exports = router;
