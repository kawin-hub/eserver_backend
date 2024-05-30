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
  blue: "#0A043C",
};

const font = {
  bold: "./system/fonts/Kanit/Kanit-Bold.ttf",
  medium: "./system/fonts/Kanit/Kanit-Medium.ttf",
  thin: "./system/fonts/Kanit/Kanit-Light.ttf",
  extraThin: "./system/fonts/Kanit/Kanit-Thin.ttf",
};

function createWarranty(data, path) {
  let doc = new PDFDocument({ size: [500, 353], margin: 30 });

  generateWarranty(doc, data);
  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateWarranty(doc, data) {
  let pageWidth = doc.page.width;
  let pageHeight = doc.page.height;

  doc.image("./system/images/waranty-background.png", 0, 0, {
    width: pageWidth,
    height: pageHeight,
  });

  doc
    .font(font.thin)
    .fillColor(color.blue)
    .fontSize(9)
    .text(data.body, margin.left + 50, 150, { width: 340, align: "center" })
    .text(data.issuedDate, margin.left + 85, 252)
    .moveDown();
}

module.exports = {
  createWarranty,
};
