import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text,
    View, ScrollView, Pressable, TouchableOpacity,} from 'react-native';
import Voice from 'react-native-voice';
import Icon from 'react-native-vector-icons/FontAwesome';
import {randomColor} from '../utils/helper';
import Clipboard from '@react-native-clipboard/clipboard';

const SpeechText = () => {
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStart = (e) => {
        console.log('onSpeechStart: ', e);
        setStarted('√');
    };

    const onSpeechEnd = (e) => {
        console.log('onSpeechEnd: ', e);
        setEnd('√');
    };

    const onSpeechError = (e) => {
        console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error.message));
    };

    const onSpeechResults = (e) => {
        console.log('onSpeechResults: ', e);
        setResults(e.value);
    };

    const onSpeechVolumeChanged = (e) => {
        console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        try {
            await Voice.start('en-US');
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setEnd('');
        } catch (e) {
            console.error(e);
        }
    };

    const stopRecognizing = async () => {
        try {
            await Voice.stop();
            setEnd('√');
        } catch (e) {
            console.error(e);
        }
    };

    const destroyRecognizer = async () => {
        try {
            await Voice.destroy();
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setEnd('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textWithSpaceStyle}>
                        {`Started: ${started}`}
                    </Text>
                    <Text style={styles.textWithSpaceStyle}>
                        {`Ended: ${end}`}
                    </Text>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.textWithSpaceStyle}>
                        {`Pitch: \n ${pitch}`}
                    </Text>
                    <Text style={styles.textWithSpaceStyle}>
                        {`Error: \n ${error}`}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button2} onPress={destroyRecognizer}>
                    <Text style={styles.text2}>RESET</Text>
                </TouchableOpacity>
                <View style={styles.resultView}>
                    <Text style={styles.text}>
                        Result
                    </Text>
                    <View style={styles.result}>
                        <ScrollView>
                            {results.map((result, index) => {
                                return (
                                    <TouchableOpacity
                                        key={`result-${index}`}
                                        onPress={() => Clipboard.setString(result)}
                                        style={styles.textStyle}>
                                        {result}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
                <Pressable onPressIn={startRecognizing} onPressOut={stopRecognizing} style={({pressed}) => [
                    {
                        backgroundColor: pressed
                            ? 'deepskyblue'
                            : 'black',
                    },
                    styles.button,
                ]}>
                    <Icon name="microphone" size={50} color={'white'}/>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default SpeechText;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        margin: '2%',
    },
    headerContainer: {
        flexDirection: 'row',
        paddingVertical: '5%',
        backgroundColor: 'white',
        margin: '1%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    textWithSpaceStyle: {
        flex: 1,
        textAlign: 'center',
        color: '#B0171F',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button2: {
        width: '30%',
        height: '6%',
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        margin: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text2: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold',
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
        height: '85%',
        backgroundColor: 'white',
        width: '96%',
        borderRadius: 5,
        alignSelf: 'center',
    },
    textStyle: {
        margin: '2%',
        alignSelf: 'center',
    },
    button: {
        height: 80,
        width: 80,
        backgroundColor: 'black',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: '3%',
    },
});
