const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collection = "RefreshToken";

let tokenSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    exp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = mongoose.model(collection, tokenSchema);
