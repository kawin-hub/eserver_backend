const { Schema, model, ObjectId } = require("mongoose");

const collection = "InventoryLots";

let inventoryLotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    products: [{ type: ObjectId, ref: "ProductModel" }, { type: Number }],
    receiveDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, inventoryLotSchema);
