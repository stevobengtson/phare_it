const httpStatus = require("http-status");
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { libraryService, userService } = require("../services");
const RestError = require("../utils/RestError");

const createLibrary = catchAsync(async (req, res) => {
    data = req.body;
    data.user = req.user;
    console.log('Library', req.user);
    const library = await libraryService.createLibrary(data);
    res.status(httpStatus.CREATED).send(library);
});

const getLibraries = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortyBy', 'limit', 'page']);
    filter['user'] = req.params.userId;
    const result = await libraryService.queryLibraries(filter, options);
    res.send(result);
});

module.exports = {
    createLibrary,
    getLibraries,
};