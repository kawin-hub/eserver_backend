const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryMoves";

let inventoryMoveSchema = new Schema(
    {
        documentNumber: {
            type: String,
            required: true,
            unique: true
        },
        dueDate: {
            type: Date,
            required: true,
        },
        inventoryLocation: {
            origin: {
                _id: { type: ObjectId, ref: "InventoryLocations" },
                name: { type: String },
            },
            destination: {
                _id: { type: ObjectId, ref: "InventoryLocations" },
                name: { type: String },
            }
        },
        currentStatus: {
          type: String,
          default: "request"
        },
        productModel: [
            {
                _id: { type: ObjectId, ref: "ProductModel" },
                modelCode: { type: String },
                name: { type: String },
                quantity: { type: Number },
            },
        ],
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

module.exports = model(collection, inventoryMoveSchema);
