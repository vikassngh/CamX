import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
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
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'Recents',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle:{
            backgroundColor:'white'
          },
          headerTitleStyle: {
            fontSize:45,
            alignSelf: 'center',
          }
        }}/>
        <Stack.Screen name="TTS" component={TextToSpeech} options={{
          title: 'Text To Speech',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleStyle: {
            fontSize:30,
            alignSelf: 'center'
          }
        }}/>
        <Stack.Screen name="STT" component={SpeechText} options={{
          title: 'Speech To Text',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleStyle: {
            fontSize:30
          }
        }}/>
        <Stack.Screen name="Camera" component={Camera} options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleStyle: {
            fontSize:30
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
