const Joi = require('joi');
const { objectId } = require('./custom.validation');

const uploadPhoto = {
    params: Joi.object().keys({
        libraryId: Joi.string().custom(objectId),
    }),
};

const getPhoto = {
    params: Joi.object().keys({
        photoId: Joi.string(),
    }),
};

module.exports = {
    uploadPhoto,
    getPhoto,
};
