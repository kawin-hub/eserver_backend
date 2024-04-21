const { Schema, model, ObjectId } = require("mongoose");
const collection = "LineLead";

let LineLeadlSchema = new Schema(
  {
    lineId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    pictureUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, LineLeadlSchema);
