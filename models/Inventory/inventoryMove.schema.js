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
        origin: {
            type: String,
            required: true,
        },
        desdination: {
            type: String,
            required: true,
        },
        products: [{
            _id: { type: ObjectId, ref: "ProductModel" },
            modelCode: String,
            name: String,
        }],
        quantity: {
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

module.exports = model(collection, inventoryMoveSchema);
