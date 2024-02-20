const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryBorrows";

let inventoryBorrowSchema = new Schema(
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
        estimatedDate: {
            type: Date,
            required: true,
        },
        purpose: {
            type: String,
            enum: ["demo", "service", "spare", "test"],
            default: "",
        },
        mainStatus: {
            type: String,
            enum: ["rent", "request"],
            default: "rent"
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

module.exports = model(collection, inventoryBorrowSchema);
