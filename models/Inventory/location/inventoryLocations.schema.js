const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryLocations";

let inventoryLocationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    googleMap: {
      type: String,
      required: true,
    },
    locationStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
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

module.exports = model(collection, inventoryLocationSchema);
