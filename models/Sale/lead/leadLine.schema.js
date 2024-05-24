const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
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

LineLeadlSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

LineLeadlSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

LineLeadlSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

LineLeadlSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, LineLeadlSchema);
