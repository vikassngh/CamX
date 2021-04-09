import RNImageToPdf from "react-native-image-to-pdf";

export const toPdf = () => (base64Arr) =>  {
  let base64Paths = [];
  base64Paths.length = 0; // re-initialize the array for further re-use

  base64Arr.forEach((base64,idx) => {
    base64Paths.push(base64[idx].uri);
  });

  return RNImageToPdf.createPDFbyImages({
    imagePaths: base64Paths,
    name: "TEST.pdf"
  });
};
