const { Schema, model, ObjectId } = require("mongoose");
const collection = "AccountExpenses";

let accountExpenseSchema = new Schema(
    {
        documentNumber: {
            type: String,
            required: true,
            unique: true,
        },
        expenseDate: {
            type: Date,
            required: true,
        },
        expenseCategory: {
            type: String,
            enum: ["stock", "nonstock"],
            default: "stock",
        },
        expenseType: {
            type: String,
            default: "others",
        },
        amount: {
            type: Number,
            default: 0,
            required: true,
        },
        whom: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
        },
        remark: {
            type: String,
        },
        images: [
            {
                name: String,
                path: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        documents: [
            {
                name: String,
                path: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
        collection,
    }
);

module.exports = model(collection, accountExpenseSchema);
