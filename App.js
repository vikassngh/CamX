import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import HomeScreen from "./src/screens/Homescreen";
import TextToSpeech from "./src/components/TTS";
import SpeechText from "./src/components/STT";
import Camera from './src/screens/Camera';
import Preview from "./src/screens/Preview";
import Edit from "./src/components/Edit";
import ImgToPdf from './src/screens/ImgToPdf';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark"/>
      <Stack.Navigator screenOptions={{
        stackAnimation:'fade'
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'Recents',
          headerStyle: {
            // backgroundColor:'red',
            height:100,
          },
          headerTitleStyle: {
            fontSize:70,
            fontFamily:'cursive',
            alignSelf: 'center',
            // color:'white'
          }
        }}/>
        <Stack.Screen name="TTS" component={TextToSpeech} options={{
          title: 'Text To Speech',
          headerLeft: false,
          headerTitleStyle: {
            fontSize:35,
            alignSelf: 'center'
          }
        }}/>
        <Stack.Screen name="STT" component={SpeechText} options={{
          title: 'Speech To Text',
          headerTitleStyle: {
            fontSize:35,
            alignSelf: 'center'
          }
        }}/>
        <Stack.Screen name="Camera" component={Camera} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="Preview" component={Preview} options={{
          title:'Preview',
          headerTitleStyle: {
            fontSize:35,
          },
        }}/>
        <Stack.Screen name="Edit" component={Edit} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="imgToPdf" component={ImgToPdf} options={{
          title: 'Image To PDF',
          headerTitleStyle: {
            fontSize:35
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
