import {Alert} from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const createHTML = ({
       content = "",
       styles = "",
   } = {}) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Example PDF</title>
            <style>
                body {
                    overflow-x: hidden;
                    background-color: #fff;
                }              
                
                .sub-container {
                    flex: 1;
                    height: 960px;
                    object-fit: contain;
                }
                .img {
                    width: 100%;
                    max-height: 100%;
                }
               
                ${styles}
            </style>
        </head>
        <body>
            <div class="sub-container">
                ${content}
            </div>   
        </body>
        </html>
    `;
};

export const mulHtml = async (photo) => {
    try{
        let cont=``;
        let i;
        for (i in photo) {
            cont = cont.concat(`
                    <img src="${photo[i].uri}" alt="photo" class="img" />
                `)
        }
        return await createHTML({content:cont});
    } catch (e){
        console.warn(e);
    }
}

export const createAndSavePDF = async (html,input) => {
    try{
        let options = {
            html: html,
            fileName: input,
            directory: 'Documents',
        };
        const file = await RNHTMLtoPDF.convert(options)
        return file;
    }catch (e) {
        console.warn(e);
    }
}

export const createPdf = async (htmlFactory,input) => {
    try {
        const html = await (htmlFactory || htmlFactory());
        if (html) {
            const file = await createAndSavePDF(html,input);
            Alert.alert("Success!", "Document has been successfully saved!\n\n File Path:"+file.filePath);
        }
    } catch (error) {
        Alert.alert("Error", error.message || "Something went wrong...");
    }
};
