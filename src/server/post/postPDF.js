import PdfPrinter from 'pdfmake';

export const pdfReadableStream = (data) => {
	const fonts = {
		Helvetica: {
			normal: 'Helvetica',
			bold: 'Helvetica-Bold',
			italics: 'Helvetica-Italic',
			bolditalics: 'Helvetica-MediumItalic',
		},
	};

	const printer = new PdfPrinter(fonts);

	const docDefinition = {
		content: [data.firstName, 'Allllllllllllllllllllllllllllllllllllllllll'],
		defaultStyle: {
			font: 'Helvetica',
		},
	};
	const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
	pdfReadableStream.end();
	return pdfReadableStream;
};
