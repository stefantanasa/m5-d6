import PdfPrinter from "pdfmake";
import fs from "fs";

const printer = new PdfPrinter(fonts);
const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

export const generateBlogPDF = async (blog) => {
  const docDefinition = {
    content: [{ text: "Hello", bold: true }],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return pdfDoc;
};
