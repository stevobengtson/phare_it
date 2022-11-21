const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLibrary = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};

const getLibraries = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const getLibrary = {
    params: Joi.object().keys({
        libraryId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createLibrary,
    getLibraries,
    getLibrary,
};
