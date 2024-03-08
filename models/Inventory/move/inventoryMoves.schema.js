const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryMoves";

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

module.exports = model(collection, inventoryMoveSchema);
