const mongoose = require('mongoose');
const mongodb = require('mongodb');
const httpStatus = require("http-status");
const { libraryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const RestError = require("../utils/RestError");
const config = require('../config/config');

const uploadPhoto = catchAsync(async (req, res) => {
    if (req.file == undefined) {
        throw new RestError(httpStatus.NO_CONTENT, 'No file to upload');
    }

    await libraryService.addPhotoToLibrary(req.params.libraryId, req.file.filename);

    res.send(req.file);
});

const getPhoto = catchAsync(async (req, res) => {
    const bucket = new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: config.mongoose.imageBucket });
    const downloadStream = bucket.openDownloadStreamByName(req.params.photoName);
    downloadStream.on("data", function (data) {
        return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
        return res.status(404).send({ message: "Cannot download the Image! -- " + err });
    });

    downloadStream.on("end", () => {
        return res.end();
    });
});

const deletePhoto = catchAsync(async (req, res) => {
    const bucket = new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: config.mongoose.imageBucket });
    const cursor = bucket.find({ filename: req.params.photoName });
    cursor.forEach((file) => {
        bucket.delete(new mongodb.ObjectId(file._id));
    });

    await libraryService.removePhotoFromLibrary(req.params.libraryId, req.params.photoName);

    res.status(200).send();
});

module.exports = {
    uploadPhoto,
    getPhoto,
    deletePhoto,
};
