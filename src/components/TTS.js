import React, {useState, useEffect} from 'react';
import {
    View, StyleSheet, TextInput, TouchableOpacity,
    SafeAreaView, Text, FlatList, Keyboard, Modal, BackHandler, Alert,
} from 'react-native';
import {Slider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
import {useFocusEffect} from '@react-navigation/native';
import { randomColor } from "../utils/helper";

const bg =randomColor();

export default function TextToSpeech({navigation}) {
    const [voices, setVoices] = useState([]);
    const [ttsStatus, setTtsStatus] = useState('initiliazing');
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [speechRate, setSpeechRate] = useState(0.5);
    const [speechPitch, setSpeechPitch] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [
        text,
        setText,
    ] = useState('');

    useEffect(() => {
        Tts.addEventListener(
            'tts-start',
            (_event) => setPlaying(true),
        );
        Tts.addEventListener(
            'tts-finish',
            (_event) => setPlaying(false),
        );
        Tts.addEventListener(
            'tts-cancel',
            (_event) => setPlaying(false),
        );
        Tts.setDefaultRate(speechRate);
        Tts.setDefaultPitch(speechPitch);
        Tts.getInitStatus().then(initTts);
        return () => {
            Tts.removeEventListener(
                'tts-start',
                (_event) => setPlaying(true),
            );
            Tts.removeEventListener(
                'tts-finish',
                (_event) => setPlaying(false),
            );
            Tts.removeEventListener(
                'tts-cancel',
                (_event) => setPlaying(false),
            );
        };
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Tts.stop();
                navigation.navigate('Home');
                return true;
            };

            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress,
            );

            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                );
            };
        }, []),
    );

    const initTts = async () => {
        const voices = await Tts.voices();
        const availableVoices = voices
            .filter((v) => !v.networkConnectionRequired && !v.notInstalled)
            .map((v) => {
                return {id: v.id, name: v.name, language: v.language};
            });
        let selectedVoice = null;
        if (voices && voices.length > 0) {
            selectedVoice = voices[0].id;
            try {
                await Tts.setDefaultLanguage('en-US');
            } catch (err) {
                console.log(`setDefaultLanguage error `, err);
            }
            await Tts.setDefaultVoice(voices[0].id);
            setVoices(availableVoices);
            setSelectedVoice(selectedVoice);
            setTtsStatus('initialized');
        } else {
            setTtsStatus('initialized');
        }
    };

    const readText = async () => {
        Tts.speak(text);
        setPlaying(true);
    };

    const stopText = async () => {
        Tts.stop();
        setPlaying(false);
    };

    const updateSpeechRate = async (rate) => {
        await Tts.setDefaultRate(rate);
        setSpeechRate(rate);
    };

    const updateSpeechPitch = async (rate) => {
        await Tts.setDefaultPitch(rate);
        setSpeechPitch(rate);
    };


    const onVoicePress = async (voice) => {
        try {
            await Tts.setDefaultLanguage(voice.language);
        } catch (err) {
            console.log(`setDefaultLanguage error `, err);
        }
        await Tts.setDefaultVoice(voice.id);
        setSelectedVoice(voice.id);
    };

    const renderVoiceItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: selectedVoice === item.id ?
                        'gray' : 'black',
                }}
                onPress={() => onVoicePress(item)}>
                <Text style={styles.buttonTextStyle}>
                    {`${item.language} - ${item.name || item.id}`}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>
                        {`Speed: ${speechRate.toFixed(2)}`}
                    </Text>
                    <Slider
                        style={styles.slider}
                        value={speechRate}
                        minimumValue={0.01}
                        maximumValue={0.99}
                        onValueChange={updateSpeechRate}
                        thumbStyle={{height: 20, width: 20, backgroundColor: bg}}
                    />
                </View>
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>
                        {`Pitch: ${speechPitch.toFixed(2)}`}
                    </Text>
                    <Slider
                        style={styles.slider}
                        value={speechPitch}
                        minimumValue={0.01}
                        maximumValue={0.99}
                        onValueChange={updateSpeechPitch}
                        thumbStyle={{height: 20, width: 20, backgroundColor: bg}}
                    />
                </View>
                <Text style={styles.sliderContainer}>
                    {`Selected Voice: ${selectedVoice || ''}`}
                </Text>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <FlatList
                        style={{width: '95%', marginTop: 10, alignSelf: 'center'}}
                        keyExtractor={(item) => item.id}
                        renderItem={renderVoiceItem}
                        extraData={selectedVoice}
                        data={voices}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.text}>DONE</Text>
                    </TouchableOpacity>
                </Modal>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.text2}>CHANGE VOICE</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setText(text)}
                    placeholder="Enter Your Text Here!"
                    onSubmitEditing={Keyboard.dismiss}
                    textAlign="center"
                    multiline
                />
                <TouchableOpacity
                    title="Press to hear some words"
                    style={styles.speak}
                    onPress={playing ? stopText : readText}>
                    <Icon name="volume-up" size={60} color={'white'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
    },
    buttonStyle: {
        justifyContent: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#8ad24e',
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 18,
        marginHorizontal: 20,
        padding: 6,
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'white',
        margin: '1%',
        borderRadius: 10,
    },
    sliderLabel: {
        textAlign: 'center',
        marginRight: 20,
        fontWeight: 'bold',
        fontSize: 18,
    },
    slider: {
        flex: 1,
    },
    textInput: {
        borderColor: bg,
        borderWidth: 2,
        borderRadius: 20,
        color: 'black',
        width: '100%',
        fontSize: 18,
        height: 300,
        backgroundColor: 'white',
    },
    button: {
        width: '40%',
        height: '7%',
        backgroundColor: bg,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
    },
    text2: {
        color: 'white',
        fontSize: 19,
        alignSelf: 'center',
    },
    speak: {
        height: 80,
        width: 80,
        backgroundColor: bg,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: '3%',
    },
});
