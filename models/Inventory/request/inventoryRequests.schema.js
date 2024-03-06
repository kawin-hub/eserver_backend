const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryRequests";

let inventoryRequestSchema = new Schema(
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
    requestType: {
      type: String,
      enum: ["sell", "booking", "borrow", "broken", "r&d", "gift", "others"],
      required: true,
    },
    estimatedReturnDate: {
      type: Date,
    },
    remark: {
      type: String,
    },
    productModel: [
      {
        _id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        quantity: { type: Number },
      },
    ],
    currentStatus: {
      type: String,
      default: "request"
    },
    createdBy: {
      _id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String }
    },
    updatedBy: {
      _id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String }
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, inventoryRequestSchema);
