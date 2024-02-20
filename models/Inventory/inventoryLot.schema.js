const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryLots";

let inventoryLotSchema = new Schema(
  {
    lotNumber: {
      type: String,
      required: true,
      unique: true,
    },
    estimatedDate: {
      type: Date,
      required: true,
    },
    expense: {
      _id: { type: ObjectId, ref: "ExpensesModel" },
      documentNumber: { type: String },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft",
    },
    products: [
      {
        _id: { type: ObjectId, ref: "ProductModel" },
        modelCode: String,
        name: String,
        quatity: Number,
        warranty: Number,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, inventoryLotSchema);
