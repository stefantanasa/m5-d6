import PdfPrinter from "pdfmake";

export const getPDFReadableStream = (data) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        text: data,
        style: "header",
      },
      "\n\n",
      {
        text: "Subheader 1 - using subheader style",
        style: "subheader",
      },
      "Lorem ",
      {
        text: "Subheader 2 - using subheader style",
        style: "subheader",
      },
      " sedatio aliena video.",
      "Lorem terentianus, perpauca sedatio aliena video.\n\n",
      {
        text: "It is possible to apply multiple styles, ",
        style: ["quote", "small"],
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      small: {
        fontSize: 8,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();

  return pdfReadableStream;
};
