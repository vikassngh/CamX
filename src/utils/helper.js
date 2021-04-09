import {Alert, Platform} from "react-native";
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNImageToPdf from "react-native-image-to-pdf";

export const createPDF = (photo) => {
    try{
        const page1 = PDFPage
            .create()
            .setMediaBox(photo[0].width, photo[0].height)
            .drawText('You can add JPG images too!')
            .drawImage(photo[0].uri, 'jpg', {
                x: 5,
                y: 25,
                width: photo[0].width,
                height: photo[0].height,
            });
        // const docsDir = await PDFLib.getDocumentsDirectory();
        // const pdfPath = `${docsDir}/sample.pdf`;
        const pdfPath = `Documents/sample.pdf`;
        PDFDocument
            .create(pdfPath)
            .addPages(page1)
            .write()
            .then(path => {
                console.log('PDF created at: ' + path);
            });
    } catch (error){
        console.log(error);
    }

}

export default base64Arr => {
  // It is a promise based function
  // Create an array containing the path of each base64 images
  let base64Paths = [];
  base64Paths.length = 0; // re-initialize the array for further re-use

  base64Arr.forEach(base64 => {
    base64Paths.push(`data:image/jpeg;base64,${base64}`);
  });

  // Convert base64 images to pdf from the paths array
  return RNImageToPdf.createPDFbyImages({
    imagePaths: base64Paths,
    name: "TEST"
  });
};
