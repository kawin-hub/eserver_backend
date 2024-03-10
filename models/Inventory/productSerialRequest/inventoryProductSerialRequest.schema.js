const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerialRequest";

let inventoryProductSerailRequestSchema = new Schema(
  {
    InventoryRequest: {
      request_id: { type: ObjectId, ref: "InventoryRequests" },
      documentNumber: { type: String },
      dueDate: { type: Date },
      requestType: { type: String },
      estimatedReturnDate: { type: Date },
      remark: { type: String },
    },
    productModel: {
      productModel_id: { type: ObjectId, ref: "ProductModel" },
      modelCode: String,
      name: String,
    },
    inOutStatus: {
      type: String,
    },
    InventoryProductSerial: [
      {
        productSerial_id: { type: ObjectId, ref: "InventoryProductSerial" },
        serialNumber: { type: String },
      },
    ],
    currentStatus: {
      type: String,
    },
    movements: [
      {
        status: {
          type: String,
          enum: [
            "create lot",
            "in stock",
            "move",
            "borrowed",
            "sold",
            "broken",
            "r&d",
            "gift",
            "others",
          ],
          //required: true,
        },
        movementDateTime: {
          type: Date,
          default: Date.now,
        },
        docNumber: {
          type: String,
          inventoryRequest: {
            request_id: { type: ObjectId, ref: "InventoryRequests" },
          },
        },
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

module.exports = model(collection, inventoryProductSerailRequestSchema);
