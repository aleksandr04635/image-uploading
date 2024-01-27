const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ImageSchema = new Schema(
  {
    name: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const ImageModel = model("Image", ImageSchema);

module.exports = ImageModel;
