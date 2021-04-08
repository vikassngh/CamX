import * as React from 'react';
import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';
import {ScrollView, View, SafeAreaView, Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <ScrollView style={{height:"100%"}}>
        <View style={{height:650}}>
          <View style={{height:650,backgroundColor:'red'}}>
            <View style={styles.mainBody}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectPdfFile}>
                <Icon name="file-pdf-o" size={100} color={"white"}/>
                <Text style={styles.buttonTextStyle}>
                  Tap here to select a PDF!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FloatingAction
            actions={actions}
            onPressItem={name => {
              if(name==="bt_scanDocument")
                navigation.navigate('Camera')
              else if(name==="bt_textToSpeech")
                navigation.navigate('TTS')
              else if(name==="bt_speechToText")
                navigation.navigate('STT')
              else if(name==="bt_imageToPdf")
                navigation.navigate('imgToPdf')
              console.log(`selected button: ${name}`);
            }}
            buttonSize={70}
            color={"black"}
            floatingIcon={<Icon name="camera" size={30} color={"white"}/>}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const actions = [
  /*{
      text: "Image Encryption",
      name: "bt_imageEncryption",
      buttonSize: 56,
      icon: <Icon name="image" size={30} color={"white"}/>,
      position: 1
  },*/
  {
    text: "Image To PDF",
    name: "bt_imageToPdf",
    buttonSize: 56,
    color:'black',
    icon: <Icon name="image" size={30} color={"white"}/>,
    position: 1
  },
  {
    text: "Speech to Text",
    name: "bt_speechToText",
    buttonSize: 56,
    color:'black',
    icon: <Icon name="microphone" size={30} color={"white"}/>,
    position: 2
  },
  {
    text: "Text to Speech",
    name: "bt_textToSpeech",
    buttonSize: 56,
    color:'black',
    icon: <Icon name="headphones" size={30} color={"white"}/>,
    position: 3
  },
  {
    text: "Scan Document",
    name: "bt_scanDocument",
    buttonSize: 56,
    color:'black',
    icon: <Icon name="camera" size={30} color={"white"}/>,
    position: 4
  }
];

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    padding: 20,
  },
  buttonStyle: {
    height: 100,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: height/3,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 20,
    fontSize: 22,
  },
});
