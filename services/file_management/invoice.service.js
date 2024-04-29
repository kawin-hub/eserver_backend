const fs = require("fs");
const PDFDocument = require("pdfkit");
const vatInPerCent = 7;

const margin = {
  top: 30,
  left: 30,
};

const color = {
  black: "#342E49",
  grey: "#b0b0b0",
  orange: "#c24914",
};

const font = {
  bold: "./system/fonts/Kanit/Kanit-Bold.ttf",
  medium: "./system/fonts/Kanit/Kanit-Medium.ttf",
  thin: "./system/fonts/Kanit/Kanit-Light.ttf",
  extraThin: "./system/fonts/Kanit/Kanit-thin.ttf",
};

function createInvoice(data, path) {
  let doc = new PDFDocument({ size: "A4", margin: 30 });

  generateHeader(doc, data);
  const subtotalResult = generateInvoiceTable(doc, data);
  generatePaymentMethod(doc);
  generateSummary(doc, subtotalResult);
  generateRemarkAndAuthorized(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, data) {
  doc
    .font(font.thin)
    .image("./system/images/logo.png", margin.left, margin.top + 10, {
      width: 100,
    })
    .fillColor(color.grey)
    .fontSize(10)
    .text("From :", margin.left, 115)
    .fillColor(color.black)
    .fontSize(10)
    .text(
      "Inhouse Technology Co., Ltd.\n77/577 Chatuchot 19,OrNgoen Subdistrict,Sai Mai District, Bangkok 10220",
      {
        width: 240,
      }
    )
    .fillColor(color.orange)
    .fontSize(17)
    .text(data.header.fileType, 200, margin.top, { align: "right" })
    .fillColor(color.black)
    .fontSize(10)
    .text("#" + data.header.documentNumber, { align: "right" })
    .fillColor(color.grey)
    .text("Created date :", 428, margin.top + 40, { continued: true })
    .fillColor(color.black)
    .text(data.header.createdDate, { align: "right", continued: false })
    .fillColor(color.grey)
    .text("Due date :", 439, margin.top + 55, { continued: true })
    .fillColor(color.black)
    .text(data.header.dueDate, {
      align: "right",
      continued: false,
    })
    .fillColor(color.grey)
    .text("Tax Identification Number :", 368, margin.top + 70, {
      continued: true,
    })
    .fillColor(color.black)
    .text("0745565007058", { align: "right", continued: false })
    .fillColor(color.grey)
    .text("To :", margin.left + 280, 115)
    .fillColor(color.black)
    .text(data.shipping.name + "\n" + data.shipping.address)
    .moveDown();
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 195;
  var subtotalResult = {
    subtotal: 0,
    discount: 0,
    vat: 0,
    total: 0,
  };

  doc.font(font.thin);
  generateHr(doc, invoiceTableTop);
  generateTableRow(
    doc,
    invoiceTableTop + 7,
    "#",
    "Item & Description",
    "Price",
    "Discount",
    "Amount",
    "Summary",
    "",
    true
  );
  generateHr(doc, invoiceTableTop + 34);
  doc.font(font.thin).fontSize(10);

  const startPosition = 187;

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = startPosition + (i + 1) * 54;

    subtotalResult.subtotal += item.price * item.quantity;
    subtotalResult.discount += item.discountBaht * item.quantity;

    generateTableRow(
      doc,
      position,
      i + 1,
      item.name,
      formatCurrency(item.price),
      formatCurrency(item.discountBaht),
      formatCurrency(parseFloat(item.quantity), ""),
      formatCurrency((item.price - item.discountBaht) * item.quantity),
      item.description
    );

    if (i < invoice.items.length - 1) {
      generateHr(doc, position + 7 + 35);
    }
  }

  subtotalResult.discount += invoice.extraDiscount;
  subtotalResult.total = subtotalResult.subtotal - subtotalResult.discount;
  subtotalResult.vat = (subtotalResult.total * vatInPerCent) / 100;
  subtotalResult.total += subtotalResult.vat;

  return subtotalResult;
}

function generatePaymentMethod(doc) {
  const docY = doc.y;

  doc
    .fillColor(color.black)
    .font(font.medium)
    .text("Payment method :", margin.left, docY + 40)
    .font(font.thin)
    .text("Bank name :", margin.left, doc.y + 5)
    .text("Account name :", margin.left, doc.y + 5)
    .text("account number :", margin.left, doc.y + 5);

  doc
    .fillColor(color.black)
    .text("SCB Bank", margin.left + 200, docY + 40)
    .text("Inhouse technology", margin.left + 156, doc.y + 5)
    .text("171-430192-2", margin.left + 185, doc.y + 5);
}

function generateSummary(doc, subtotalResult) {
  const docY = doc.y;
  generateHr(doc, docY - 70, 285);
  doc
    .text("Sub total", 335, docY - 60, { continued: true })
    .text(formatCurrency(subtotalResult.subtotal), {
      align: "right",
      continued: false,
    });
  generateHr(doc, docY - 35, 285);
  doc
    .fillColor(color.orange)
    .text("Discount", 335, docY - 25, { continued: true })
    .text(formatCurrency(subtotalResult.discount), {
      align: "right",
      continued: false,
    });
  generateHr(doc, docY - 0, 285);
  /* doc
    .fillColor(color.orange)
    .text("Extra discount", 335, docY, { continued: true })
    .text(formatCurrency(subtotalResult.discount), {
      align: "right",
      continued: false,
    });
  generateHr(doc, doc.y + 10, 285); */
  doc
    .fillColor(color.black)
    .text("VAT (7%)", 335, docY + 10, { continued: true })
    .text(formatCurrency(subtotalResult.vat), {
      align: "right",
      continued: false,
    });
  generateHr(doc, doc.y + 10, 285);
  doc
    .text("Total", 335, docY + 45, { continued: true })
    .text(formatCurrency(subtotalResult.total), {
      align: "right",
      continued: false,
    });
}

function generateRemarkAndAuthorized(doc) {
  const docY = doc.y;
  const marginTop = 30;

  doc
    .font(font.medium)
    .text("Remark", margin.left, docY + marginTop)
    .font(font.extraThin)
    .text(
      "• 50% pre-production payment required for the smart film.",
      margin.left,
      docY + marginTop + 20
    )
    .text("• Remaining 50% due prior to installation.")
    .text("• Production and shipping timeframe: 30-45 days.")
    .text("• Two-years warranty included.");

  doc.text(
    "We appreciate your selection of our services.",
    margin.left,
    doc.y + 10
  );

  doc
    .font(font.thin)
    .text("Authorized person", margin.left + 350, docY + marginTop)
    .image(
      "./system/images/signature-scan.png",
      margin.left + 317,
      docY + marginTop + 25,
      {
        width: 130,
      }
    )
    .font(font.medium)
    .text("Siyakon pongpan", margin.left + 350, docY + marginTop + 90)
    .font(font.thin)
    .text("Sale Manager", margin.left + 357, docY + marginTop + 110);
}

function generateTableRow(
  doc,
  y,
  number,
  item,
  price,
  discount,
  amount,
  summary,
  description,
  tableHeader = false
) {
  if (tableHeader) {
    doc.font(font.bold);
  } else {
    doc.font(font.thin);
  }

  doc
    .fillColor(color.black)
    .fontSize(10)
    .text(number, 40, y)
    .text(item, 70, y)
    .text(price, 250, y, { width: 90, align: "right" })
    .text(discount, 330, y, { width: 90, align: "right" })
    .text(amount, 400, y, { width: 90, align: "right" })
    .text(summary, 0, y, { align: "right" });

  if (!tableHeader)
    doc.font(font.thin).fillColor(color.grey).text(description, 70);
}

function generateHr(doc, y, fromleft = 0) {
  doc
    .strokeColor(color.grey)
    .lineWidth(0.1)
    .moveTo(margin.left + fromleft, y)
    .lineTo(570, y)
    .stroke();
}

function formatCurrency(price, prefix = "฿") {
  return (
    prefix +
    price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    String(day).padStart(2, "0") +
    "/" +
    String(month).padStart(2, "0") +
    "/" +
    year
  );
}

module.exports = {
  createInvoice,
};