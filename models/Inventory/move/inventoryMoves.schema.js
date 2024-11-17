const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryMoves";
const { general } = require("../../../middleware");

let inventoryMoveSchema = new Schema(
  {
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    inventoryLocation: {
      origin: {
        location_id: { type: ObjectId, ref: "InventoryLocations" },
        name: { type: String },
      },
      destination: {
        location_id: { type: ObjectId, ref: "InventoryLocations" },
        name: { type: String },
      },
    },
    currentStatus: {
      type: String,
      default: "request",
    },
    productModel: [
      {
        productModel_id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        quantity: { type: Number },
      },
    ],
    createdBy: {
      user_id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String },
    },
    updatedBy: {
      user_id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

inventoryMoveSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryMoveSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryMoveSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryMoveSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryMoveSchema);
