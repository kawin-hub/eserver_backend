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
            enum: ["smart film", "smart home", "smart mirror", "others", "marketing", "ค่า Plateform, license และ cloud ต่าง ๆ", "test product", "ค่าน้ำมัน", "เบ็ดเตล็ด"],
            default: "",
        },
        expenseType: {
            type: String,
            enum: ["stock", "nonstock"],
            default: "stock",
        },
        amount: {
            type: Number,
            default: 0,
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
