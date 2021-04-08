import {Alert, Platform} from "react-native";
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export const createPDF = (photo) => async () => {
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
        const docsDir = await PDFLib.getDocumentsDirectory();
        const pdfPath = `${docsDir}/sample.pdf`;
        PDFDocument
            .create(pdfPath)
            .addPages(page1)
            .write()
            .then(path => {
                console.log('PDF created at: ' + path);
            });
    } catch (error){
        console.log('1111111');
        console.log(error);
    }


}
