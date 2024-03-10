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
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    amountRecieved: {
      percent: {
        type: Number,
      },
      baht: {
        type: Number,
        required: true,
      },
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    //ข้อมูลที่ฝากไว้ในหน้า Invoice ก่อนเพราะยังไม่มี Schema ของตัวแม่รองรับ (Project ยังไม่ได้ถูกสร้าง)
    convertInfo: {
      customerType: {
        type: String,
        enum: ["project", "dealer", "general"],
        default: "general",
        required: true,
      },
      convertType: {
        type: String,
        enum: ["install", "delivery"],
        required: true,
      },
      installationInfo: {
        estimateDate: {
          type: Date,
        },
        address: {
          lead_id: { type: ObjectId, ref: "SaleLeads" },
          firstname: { type: String },
          lastname: { type: String },
          contactNumber: { type: String },
          companyName: { type: String },
          branch: { type: String },
          address: { type: String },
          googleMap: { type: String },
        },
      },
      deliveryInfo: {
        deliveryDate: {
          type: Date,
        },
        address: {
          lead_id: { type: ObjectId, ref: "SaleLeads" },
          firstname: { type: String },
          lastname: { type: String },
          contactNumber: { type: String },
          companyName: { type: String },
          branch: { type: String },
          address: { type: String },
          googleMap: { type: String },
        },
      },
    },
    // ข้อมูลที่ดึงมาจากแหล่งอื่นตอน Convert จะอยู่ในหน้า Invoice
    // saleQuotation ดึงมาอย่างเดียว ไม่เก็บ
    quotation_id: { type: ObjectId, ref: "SaleQuotations", required: true },
    // ส่วนนี้ทั้งหมดดึงมาและเก็บ
    customerInfo: {
      lead_id: { type: ObjectId, ref: "SaleLeads" },
      firstname: { type: String },
      lastname: { type: String },
      contactNumber: { type: String },
      companyName: { type: String },
      branch: { type: String },
      address: { type: String },
      taxId: { type: String },
    },
    products: [
      {
        productModel_id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        discountPercent: { type: Number },
        discountBaht: { type: Number },
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

module.exports = model(collection, invoiceSchema);
