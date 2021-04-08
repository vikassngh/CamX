import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import HomeScreen from "./src/screens/Homescreen";
import TextToSpeech from "./src/components/TTS";
import SpeechText from "./src/components/STT";
import Camera from './src/screens/Camera';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark"/>
      <Stack.Navigator screenOptions={{
        stackAnimation:'fade'
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'HOME',
          headerShown:false
        }}/>
        <Stack.Screen name="TTS" component={TextToSpeech} options={{
          title: 'Text To Speech',
          headerLeft: false,
          headerTitleStyle: { alignSelf: 'center' }
        }}/>
        <Stack.Screen name="STT" component={SpeechText} options={{
          title: 'Speech To Text',
          headerLeft: false,
          headerTitleStyle: { alignSelf: 'center' }
        }}/>
        <Stack.Screen name="Camera" component={Camera} options={{
          headerShown:false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
