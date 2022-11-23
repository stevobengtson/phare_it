const Joi = require('joi');
const { objectId } = require('./custom.validation');

const uploadPhoto = {
    params: Joi.object().keys({
        libraryId: Joi.string().custom(objectId),
    }),
};

const getPhoto = {
    params: Joi.object().keys({
        photoName: Joi.string(),
    }),
};

const deletePhoto = {
    params: Joi.object().keys({
        libraryId: Joi.string().custom(objectId),
        photoName: Joi.string(),
    }),
};

module.exports = {
    uploadPhoto,
    getPhoto,
    deletePhoto,
};
