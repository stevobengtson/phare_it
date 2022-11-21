const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const librarySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: false,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    photos: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "fs.files",
    }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
librarySchema.plugin(toJSON);
librarySchema.plugin(paginate);

/**
 * @typedef Library
 */
const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
