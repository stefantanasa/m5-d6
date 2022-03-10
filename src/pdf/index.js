import PdfPrinter from "pdfmake";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
  },
};
const printer = new PdfPrinter(fonts);

export const generateBlogPDF = async (blog) => {
  const docDefinition = {
    content: [{ text: "Hello", bold: true }],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return pdfDoc;
};
