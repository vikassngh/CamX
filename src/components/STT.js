import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView, TextInput, Pressable, TouchableOpacity,
} from "react-native";
import Voice from 'react-native-voice';
import Icon from "react-native-vector-icons/FontAwesome";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>
            {`Started: ${started}`}
          </Text>
          <Text style={styles.textWithSpaceStyle}>
            {`Pitch: \n ${pitch}`}
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>
            {`Ended: ${end}`}
          </Text>
          <Text style={styles.textWithSpaceStyle}>
            {`Error: \n ${error}`}
          </Text>
        </View>
        <View style={styles.horizontalView}>
          <TouchableOpacity style={styles.button2} onPress={destroyRecognizer}>
            <Text style={styles.text2}>RESET</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          Results
        </Text>
        <ScrollView style={{marginBottom: 42}}>
          {results.map((result, index) => {
            return (
              <TextInput
                key={`result-${index}`}
                style={styles.textStyle}>
                {result}
              </TextInput>
            );
          })}
        </ScrollView>
        <Pressable onPressIn={startRecognizing} onPressOut={stopRecognizing} style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'deepskyblue'
              : 'black'
          },
          styles.button
        ]}>
          <Icon name="microphone" size={40} color={"white"}/>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SpeechText;

const styles = StyleSheet.create({
  button2:{
    width:100,
    height:30,
    backgroundColor:'black',
    borderWidth: 1,
    borderRadius:30,
    margin:5,
    textAlign:'center'
  },
  text2:{
    color:'white',
    fontSize: 16,
    alignSelf:'center',
    padding:3,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical:10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
  },
  textStyle: {
    padding: 3,
    borderColor:'red',
    borderWidth:1,
    margin:10,
    backgroundColor: 'dimgray'
  },
  text:{
    textAlign: 'center',
    margin:15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex:1,
    textAlign:'center',
    color: '#B0171F',
    fontSize:15,
    fontWeight:'bold'
  },
  button:{
    height:60,
    width:60,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginVertical:10,
  }
});
