import {Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const createHTML = ({content = '',} = {}) => {
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
    try {
        let cont = ``;
        let i;
        for (i in photo) {
            cont = cont.concat(`
                    <img src="${photo[i].uri}" alt="photo" class="img" />
                `);
        }
        return await createHTML({content: cont});
    } catch (e) {
        console.warn(e);
    }
};


export const createAndSavePDF = async (html, input) => {
    try {
        let options = {
            html: html,
            fileName: input,
            directory: 'Documents',
        };
        const file = await RNHTMLtoPDF.convert(options);
        return file;
    } catch (e) {
        console.warn(e);
    }
};

export const createPdf = async (htmlFactory, input) => {
    try {
        const html = await (htmlFactory || htmlFactory());
        if (html) {
            const file = await createAndSavePDF(html, input);
            Alert.alert('Success!', 'Document has been successfully saved!\n\n File Path:' + file.filePath);
        }
    } catch (error) {
        Alert.alert('Error', error.message || 'Something went wrong...');
    }
};

const bgC = ['orangered', 'deepskyblue', '#F93822FF',
    '#5F4B8BFF', '#00A4CCFF', '#F95700FF', '#00203FFF',
    '#ED2B33FF', '#2C5F2D', '#EEA47FFF', '#212017',
    '#2BAE66FF', '#6E6E6DFF', '#DAA03DFF', '#990011FF',
    '#FDD20EFF', '#006B38FF', '#FFD662FF', '#00539CFF',
    '#FFA177FF', '#DF6589FF', '#9E1030FF', '#4B878BFF',
    '#5CDB95', '#3500D3', '#5AB9EA', '#00887A'];

export const randomColor = () => {
    return bgC[Math.floor(Math.random() * bgC.length)];
};
