const { Schema, model, ObjectId } = require("mongoose");
const collection = "Invoices";

let invoiceSchema = new Schema(
    {
        // ข้อมูลที่ต้องเพิ่มใน Invoice
        documentNumber: {
            type: String,
            required: true,
            unique: true,
        },
        issuedDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        dueDate: {
            type: Date,
            required: true,
        },
        invoicePercentSummary: {
            type: Number,
            min: 0,
            max: 100,
            required: true,
        },
        invoiceSummary: {
            type: Number,
            default: 0,
            required: true,
        },
        customerType: {
            type: String,
            enum: ["project", "dealer", "general"],
            default: "general",
            required: true,
        },
        projectType: {
            type: String,
            enum: ["install", "delivery"],
            required: true,
        },
        // ต้องเลือกวันที่และที่อยู่ ถ้าเลือกประเภทงานเป็น Delivery จะไม่มีข้อมูลของ Install
        deliveryDate: {
            type: Date
        },
        estimateInstallationDate: {
            type: Date
        },
        saleLead: {
            _id: { type: ObjectId, ref: "SaleLeads" },
            leadFirstname: { type: String },
            leadLastname: { type: String },
            leadContactNumber: { type: String },
            companyName: { type: String },
            branch: { type: String },
            address: { type: String },
            taxId: { type: String },
            googleMap: { type: String, qq },
        },
        currentStatus: {
            type: String,
            default: "waiting for payment"
        },
        // ข้อมูลที่ดึงมาจากแหล่งอื่นตอน Convert จะอยู่ในหน้า Invoice
        saleQuotation: {
            _id: { type: ObjectId, ref: "saleQuotations" },
            documentNumber: { type: String },
            salesperson: { type: String },
            paymentMethod: { type: String },
            note: { type: String },
        },
        saleLead: {
            _id: { type: ObjectId, ref: "SaleLeads" },
            leadFirstname: { type: String },
            leadLastname: { type: String },
            leadContactNumber: { type: String },
            companyName: { type: String },
            branch: { type: String },
            address: { type: String },
            taxId: { type: String },
            googleMap: { type: String, qq },
        },
        products: [
            {
                _id: { type: ObjectId, ref: "ProductModel" },
                modelCode: { type: String },
                name: { type: String },
                price: { type: Number },
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

module.exports = model(collection, invoiceSchema);
