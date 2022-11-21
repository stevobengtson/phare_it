const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const config = require('../config/config');

const storage = new GridFsStorage({
  url: config.mongoose.url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-phare-it-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: config.imageBucket,
      filename: `${Date.now()}-phare-it-${file.originalname}`,
    };
  },
});

const uploadFiles = multer({ storage: storage });
module.exports = {
  uploadFiles,
};
