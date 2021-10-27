import PdfPrinter from 'pdfmake';

export const pdfReadableStream = (data) => {
	const fonts = {
		Helvetica: {
			normal: 'Helvetica',
			bold: 'Helvetica-Bold',
		},
	};

	const printer = new PdfPrinter(fonts);

	const docDefinition = {
		content: [
			' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nterdum vel nisi vel venenatis.Sed lectus dui, elementum eget velit ac, efficitur sollicitudin mauris.Proin id nisl sit amet est lacinia dignissim.Nam accumsan eleifend nunc.Donec purus nisi, bibendum interdum sem sit amet, viverra molestie dolor. sit amet, viverra molestie dolor.sit amet, viverra molestie dolor.sit amet, viverra molestie dolor.Proin pharetra elit magna, non viverra lacus volutpat nec.In tempus laoreet eros.  ',
		],
		defaultStyle: {
			font: 'Helvetica',
		},
	};
	const options = {
		// ...
	};
	const pdfReadableStream = printer.createPdfKitDocument(
		docDefinition,
		options,
	);
	pdfReadableStream.end();
	return pdfReadableStream;
	console.log(1245);
};
