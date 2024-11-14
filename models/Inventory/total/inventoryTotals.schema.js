const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryTotals";
const { general } = require("../../../middleware");

let inventoryTotalSchema = new Schema(
  {
    productModel: {
      productModel_id: { type: ObjectId, ref: "ProductModel" },
      modelCode: { type: String },
      name: { type: String },
      status: { type: String },
    },
    inventoryLocation: {
      location_id: { type: ObjectId, ref: "inventoryLocations" },
      name: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

inventoryTotalSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryTotalSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryTotalSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryTotalSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryTotalSchema);
