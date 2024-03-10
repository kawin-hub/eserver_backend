const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerialMove";

let inventoryProductSerailMoveSchema = new Schema(
  {
    inventoryMove: {
      move_id: { type: ObjectId, ref: "InventoryMoves" },
      documentNumber: { type: String },
      dueDate: { type: Date },
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
    productModel: {
      productModel_id: { type: ObjectId, ref: "ProductModel" },
      modelCode: String,
      name: String,
    },
    jobStatus: {
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
      default: "move",
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
          inventoryMove: {
            move_id: { type: ObjectId, ref: "InventoryMoves" },
          },
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

module.exports = model(collection, inventoryProductSerailMoveSchema);
