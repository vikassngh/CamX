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
            
                @page {
                        size: A4;
                }
                
                body {
                    height: 100%;
                    overflow-x: hidden;
                }
                
                html,body {
                    background-color: #fff;
                    height: 98%;
                }

                .sub-container img{
                    display: flex;
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    object-position: center;
                    margin-left: auto;
                    margin-right: auto;
                    /*filter: grayscale(100%);*/
                }

                .sub-container {
                    flex: 1;
                    height: fit-content;
                    min-width: fit-content;
                }
                
                .container{
                    flex: 1;
                    flex-direction: column;
                    height: 827px;
                    width: 580px;
                    padding-bottom: 2.7%;
                    justify-content: center;
                    align-content: center;
                    align-items: center;
                    align-self: center;
                }
                
                ${styles}
            </style>
        </head>
        <body>
            ${content}
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
                    <div class="sub-container">
                        <img src="${photo[i].uri}" alt="photo" />
                    </div>
                `)
        }
        return await createHTML({content:cont});
    } catch (e){
        console.log(e);
    }
}

export const createAndSavePDF = async (html,input) => {
    try{
        let options = {
            html: html,
            fileName: input,
            directory: 'Documents',
            width:595,
            height:842
        };

        let file = await RNHTMLtoPDF.convert(options)
        console.log(file.filePath);
    }catch (e) {
        console.log(e);
    }
}

export const createPdf = (htmlFactory,input) => async () => {
    try {
        const html = await (htmlFactory || htmlFactory());
        if (html) {
            await createAndSavePDF(html,input);
            Alert.alert("Success!", "Document has been successfully saved!");
        }
    } catch (error) {
        Alert.alert("Error", error.message || "Something went wrong...");
    }
    // return []
};
