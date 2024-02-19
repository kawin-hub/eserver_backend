const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = mongoose.model(collection, inventoryLocationSchema);
