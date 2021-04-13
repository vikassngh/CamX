import * as React from 'react';
import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';
import {ScrollView, View, SafeAreaView, Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {randomColor} from '../utils/helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function HomeScreen({navigation}) {
  const selectPdfFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf]
      });
      if (res) {
        let uri = res.uri;
        console.log('URI : ' + uri);
        FileViewer.open(uri)
            .then(() => {
              console.log('Success');
            })
            .catch(_err => {
              console.log(_err);
            });
      }
    } catch (err) {
      if(DocumentPicker.isCancel){
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
      <SafeAreaView forceInset={{top:'always'}}>
        <View style={styles.container}>
          <TouchableOpacity
              style={styles.wideButton}
              onPress={selectPdfFile}
          >
            <Icon name="file-pdf-o" size={80} color={"white"}/>
            <Text style={styles.buttonText}>
              Tap Here to Open PDF!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TFI')}
          >
            <Icon name="file-text-o" size={80} color={"white"}/>
            <Text style={styles.buttonText}>
              Text From Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('imgToPdf')}
          >
            <Icon name="image" size={80} color={"white"}/>
            <Text style={styles.buttonText}>
              Image To PDF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('STT')}
          >
            <Icon name="microphone" size={80} color={"white"}/>
            <Text style={styles.buttonText}>
              Speech to Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TTS')}
          >
            <Icon name="headphones" size={80} color={"white"}/>
            <Text style={styles.buttonText}>
              Text to Speech
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.wideButton}
              onPress={() =>navigation.navigate('Camera',{
                photo:[]
              })}
          >
            <Icon name="camera" size={80} color={"white"}/>
            <Text style={styles.buttonText}>
              Scanner
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    width:'100%',
    height:height,
  },
  wideButton: {
    width: '99%',
    height: height/4.6,
    margin:'0.5%',
    borderWidth: 5,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor:randomColor(),
    justifyContent:'center',
    alignSelf:'center',
    alignItems: 'center',
  },
  button: {
    width:'49%',
    height:height/4.6,
    margin:'0.5%',
    borderWidth: 5,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor:randomColor(),
    justifyContent:'center',
    alignSelf:'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    paddingVertical: 5,
    fontSize: 22,
  },
});
