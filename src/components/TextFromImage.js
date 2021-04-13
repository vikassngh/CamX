import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TesseractOcr, {LANG_ENGLISH, useEventListener} from 'react-native-tesseract-ocr';
import Clipboard from '@react-native-clipboard/clipboard';
import {randomColor} from '../utils/helper';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
    cropping: true,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WITH,
};

export default function TFI() {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imgSrc, setImgSrc] = useState(null);
    const [text, setText] = useState('');
    useEventListener('onProgressChange', (p) => {
        setProgress(p.percent / 100);
    });

    const recognizeTextFromImage = async (path) => {
        setIsLoading(true);

        try {
            const tesseractOptions = {};
            const recognizedText = await TesseractOcr.recognize(path, LANG_ENGLISH, tesseractOptions);
            setText(recognizedText);
        } catch (err) {
            console.error(err);
            setText('');
        }

        setIsLoading(false);
        setProgress(0);
    };

    const recognizeFromPicker = async (options = defaultPickerOptions) => {
        try {
            const image = await ImagePicker.openPicker(options);
            setImgSrc({uri: image.path});
            await recognizeTextFromImage(image.path);
        } catch (err) {
            if (err.message !== 'User cancelled image selection') {
                console.error(err);
            }
        }
    };

    const recognizeFromCamera = async (options = defaultPickerOptions) => {
        try {
            const image = await ImagePicker.openCamera(options);
            setImgSrc({uri: image.path});
            await recognizeTextFromImage(image.path);
        } catch (err) {
            if (err.message !== 'User cancelled image selection') {
                console.error(err);
            }
        }
    };

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {imgSrc && (<Image style={styles.image} source={imgSrc}/>)}
                </View>
                <View style={styles.resultView}>
                    <Text style={styles.text}>
                        Result
                    </Text>
                    <View style={styles.result}>
                        {isLoading ? (<Text>Loading....</Text>) : (
                            <ScrollView>
                                <TouchableOpacity
                                    onPress={() => Clipboard.setString(text)}
                                    style={styles.textStyle}
                                    >
                                    <Text>{text}</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.options}>
                <TouchableOpacity style={styles.button} onPress={() => {recognizeFromCamera();}}>
                    <Text style={styles.text2}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {recognizeFromPicker();}}>
                    <Text style={styles.text2}>Picker</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '92%',
        marginHorizontal: '2%',
    },
    imageContainer: {
        height:'43%',
        width:'96%',
        marginVertical: '4%',
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode:'contain',
        alignSelf: 'center',
        margin: '2%',
    },
    resultView: {
        height: '50%',
        backgroundColor: randomColor(),
        width: '100%',
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        margin: '2%',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'white',
        width: '96%',
        borderRadius: 5,
        alignSelf: 'center',
    },
    result: {
        height: '83%',
        backgroundColor: 'white',
        width: '96%',
        borderRadius: 5,
        alignSelf: 'center',
    },
    textStyle: {
        margin: '2%',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'gray',
        color: 'black',
    },
    options: {
        flexDirection:'row',
        width:'100%',
        height:'8%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    button: {
        width: '30%',
        height: '80%',
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text2: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});
