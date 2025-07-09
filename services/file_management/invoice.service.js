const fs = require("fs");
const PDFDocument = require("pdfkit");

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
  extraThin: "./system/fonts/Kanit/Kanit-Thin.ttf",
};

const pageSetUp = { size: "A4", margin: 30 };
const itemPerPage = 5;

function createInvoice(data, path, type = "quotation") {
  var subtotalResult = {
    subtotal: 0,
    discount: 0,
    vat: 0,
    total: 0,
  };

  try {
    let doc = new PDFDocument(pageSetUp);

    const totalPage = Math.ceil(data.items.length / itemPerPage);

    for (var i = 0; i < totalPage; i++) {
      const dataStart = i * itemPerPage;
      const dataEnd = dataStart + itemPerPage;

      var invoice = { items: data.items.slice(dataStart, dataEnd) };
      invoice.extraDiscount = data.extraDiscount;
      const currentRow = i * itemPerPage + 1;

      generateHeader(doc, data, type);
      subtotalResult = generateInvoiceTable(
        doc,
        invoice,
        currentRow,
        subtotalResult
      );
      generatePaymentMethod(doc, data);

      if (i < totalPage - 1) {
        generateRemarkAndAuthorized(doc, data, type);
        createPageNumber(doc, totalPage,i+1);
        doc.addPage(pageSetUp);
      } else {
        subtotalResult.discount += data.extraDiscount;
        subtotalResult.total =
          subtotalResult.subtotal - subtotalResult.discount;
        subtotalResult.vat = (subtotalResult.total * data.vat) / 100;
        subtotalResult.total += subtotalResult.vat;

        generateSummary(doc, subtotalResult, data.vat);
        generateRemarkAndAuthorized(doc, data, type);
        createPageNumber(doc, totalPage,i+1);
      }
    }

    doc.end();
    doc.pipe(fs.createWriteStream(path));
  } catch (error) {
    console.log(error);
  }
}

function generateHeader(doc, data, type) {
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
      "Inhouse Technology Co., Ltd.\n77/577 OrNgoen Subdistrict,Sai Mai District, Bangkok 10220",
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
    .fillColor(color.grey);
  if (type != "receipt") {
    doc
      .text("Due date :", 439, margin.top + 55, { continued: true })
      .fillColor(color.black)
      .text(data.header.dueDate, {
        align: "right",
        continued: false,
      });
  }

  doc
    .fillColor(color.grey)
    .text("Taxpayer Identification Number :", 348, margin.top + 70, {
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

function generateInvoiceTable(doc, invoice, currentRow, subtotalResult) {
  let i;
  const invoiceTableTop = 195;

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
      currentRow + i,
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

  return subtotalResult;
}

function generatePaymentMethod(doc) {
  const docY = doc.y;

  doc
    .fillColor(color.black)
    .font(font.medium)
    .text("Payment method :", margin.left, docY + 30)
    .font(font.thin)
    .text("Bank name :", margin.left, doc.y + 5)
    .text("Account name :", margin.left, doc.y + 5)
    .text("account number :", margin.left, doc.y + 5);

  doc
    .fillColor(color.black)
    .text("SCB Bank", margin.left + 200, docY + 50)
    .text("Inhouse technology", margin.left + 156, doc.y + 5)
    .text("171-430192-2", margin.left + 185, doc.y + 5);
}

function generateSummary(doc, subtotalResult, vatInPerCent) {
  const docY = doc.y;
  generateHr(doc, docY - 80, 285);
  doc
    .text("Sub total", 335, docY - 73, { continued: true })
    .text(formatCurrency(subtotalResult.subtotal), {
      align: "right",
      continued: false,
    });
  generateHr(doc, docY - 51, 285);
  doc
    .fillColor(color.orange)
    .text("Discount", 335, docY - 44, { continued: true })
    .text(formatCurrency(subtotalResult.discount), {
      align: "right",
      continued: false,
    });
  generateHr(doc, docY - 22, 285);
  doc
    .fillColor(color.black)
    .text("Pre VAT Total", 335, docY - 15, { continued: true })
    .text(formatCurrency(subtotalResult.subtotal - subtotalResult.discount), {
      align: "right",
      continued: false,
    });
  generateHr(doc, doc.y + 7, 285);
  doc
    .text("VAT (" + vatInPerCent + "%)", 335, docY + 14, { continued: true })
    .text(formatCurrency(subtotalResult.vat), {
      align: "right",
      continued: false,
    });
  generateHr(doc, doc.y + 7, 285);
  doc
    .text("Total", 335, docY + 43, { continued: true })
    .text(formatCurrency(subtotalResult.total), {
      align: "right",
      continued: false,
    });
}

function generateRemarkAndAuthorized(doc, data, type) {
  const docY = doc.y;
  const marginTop = 20;

  if (type != "receipt") {
    doc.font(font.medium).text("Remark", margin.left, docY + marginTop);
    doc
      .font(font.extraThin)
      .text(
        data.note != "undefined" ? data.note : "",
        margin.left,
        docY + marginTop + 20
      );

    doc.text(
      "We appreciate your selection of our services.",
      margin.left,
      doc.y + 10
    );
  } else {
    doc
      .font(font.thin)
      .text("Customer signature", margin.left + 80, docY + marginTop)
      .text("Date", margin.left + 115, docY + marginTop + 90)
      .text(
        ".................../.................../...................",
        margin.left + 68,
        docY + marginTop + 110
      );
  }

  doc
    .font(font.thin)
    .text("Authorized person", margin.left + 390, docY + marginTop)
    .image(
      "./system/images/signature-scan.png",
      margin.left + 357,
      docY + marginTop + 25,
      {
        width: 130,
      }
    )
    .font(font.medium)
    .text("Siyakon pongpan", margin.left + 390, docY + marginTop + 90)
    .font(font.thin)
    .text("Sale Manager", margin.left + 397, docY + marginTop + 110);
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

function createPageNumber(doc, totalPage, currentPage) {
  doc.text(
    currentPage + "/" + totalPage,
    0,
    doc.page.height - 30 - doc.currentLineHeight(),
    {
      align: "right",
    }
  );
}

module.exports = {
  createInvoice,
};
