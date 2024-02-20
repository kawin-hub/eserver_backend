const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryLots";

let inventoryLotSchema = new Schema(
  {
    lotNumber: {
      type: String,
      required: true,
      unique: true
    },
    estimatedDate: {
      type: Date,
      required: true,
    },
    ExpensesNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft",
    },

    products: [{ type: ObjectId, ref: "ProductModel" }],

    quantity: {
      type: Number,
      required: true,
    },
    warranty: {
      type: Number,
      required: true,
    },

  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, inventoryLotSchema);
