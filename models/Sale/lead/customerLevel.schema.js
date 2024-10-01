const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
const collection = "SaleCustomerLevels";

let SaleCustomerLevelSchema = new Schema(
  {
    level: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

SaleCustomerLevelSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

SaleCustomerLevelSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

SaleCustomerLevelSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

SaleCustomerLevelSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, SaleCustomerLevelSchema);
