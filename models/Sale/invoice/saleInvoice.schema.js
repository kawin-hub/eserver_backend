const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
const collection = "SaleInvoices";

let saleInvoiceSchema = new Schema(
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

    paidDate: {
      type: Date,
    },

    note: {
      type: String,
    },

    invoiceNumbers: {
      type: String,
    },

    taxInvoiceNumber: {
      type: String,
    },

    pdfPath: {
      type: String,
    },
    // ข้อมูลที่ฝากไว้ในหน้า Invoice ก่อนเพราะยังไม่มี Schema ของตัวแม่รองรับ (Project ยังไม่ได้ถูกสร้าง)
    convertInfo: {
      // ต้องดึงมาแบบนี้ใช่ไหม
      customerLevel: {
        customerLevel_id: { type: ObjectId, ref: "SaleCustomerLevels" },
        level: { type: String },
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
          companyInfo_id: { type: ObjectId, ref: "SaleLeads" },
          companyName: { type: String },
          branch: { type: String },
          taxId: { type: String },
          address: { type: String },
          googleMap: { type: String },
          firstname: { type: String },
          lastname: { type: String },
          contactNumber: { type: String },
        },
      },
      deliveryInfo: {
        deliveryDate: {
          type: Date,
        },
        address: {
          companyInfo_id: { type: ObjectId, ref: "SaleLeads" },
          companyName: { type: String },
          branch: { type: String },
          taxId: { type: String },
          address: { type: String },
          googleMap: { type: String },
          firstname: { type: String },
          lastname: { type: String },
          contactNumber: { type: String },
        },
      },
    },
    // ดึง saleQuotation มาอย่างเดียว ไม่เก็บ
    quotation_id: { type: ObjectId, ref: "SaleQuotations", required: true },
    // ส่วนนี้ทั้งหมดดึงมาและเก็บ
    // ข้อมูลในใบ Invoice ตรง "ถึง"
    customerInfo: {
      lead_id: { type: ObjectId, ref: "SaleLeads" },
      lineId: { type: String },
      companyInfo: {
        companyInfo_id: { type: ObjectId, ref: "SaleLeads" },
        companyName: { type: String },
        taxId: { type: String },
        branch: { type: String },
        address: { type: String },
        googleMap: { type: String },
        companyEmail: { type: String },
        companyContactNumber: { type: String },
        firstname: { type: String },
        lastname: { type: String },
        contactNumber: { type: String },
      },
    },
    // ข้อมูลสินค้าในใบ Invoice
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
    // Documents from Store
    paymentDocuments: [
      {
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    paymentImages: [
      {
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    //สร้างและอัปเดตโดยใคร
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

saleInvoiceSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

saleInvoiceSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleInvoiceSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleInvoiceSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, saleInvoiceSchema);
