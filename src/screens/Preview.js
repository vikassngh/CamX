import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context/src/SafeAreaView";
import Icon from "react-native-vector-icons/MaterialIcons";
import {createPdf, mulHtml} from '../utils/helper';
import Dialog from "react-native-dialog";

export default function Preview({route, navigation}) {
    const [shown,isShown] = React.useState(false)
    const [input,setInput] = React.useState(undefined)

    const {photo} = route.params

    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <ScrollView style={{height:'90%'}}>
                <View style={styles.prev}>
                    {photo.map((value, idx) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Edit',{
                                        photo:photo,
                                        idx:idx
                                    });
                                }}
                            >
                                {photo && <Image style={styles.photo} key={idx} source={photo[idx]}/>}
                            </TouchableOpacity>
                            <Text style={styles.Index}>{idx+1}</Text>
                        </View>
                    ))}
                </View>
                <Dialog.Container visible={shown}>
                    <Dialog.Title>Enter PDF Name (without .pdf extension):</Dialog.Title>
                    <Dialog.Input
                        placeholder="Enter Input"
                        style={{fontSize:18}}
                        onChangeText={(value)=>{setInput(value)}}
                    />
                    <Dialog.Button
                        label="Cancel"
                        style={{fontSize:18}}
                        onPress={() => isShown(false)} />
                    <Dialog.Button
                        label="Done"
                        style={{fontSize:18}}
                        onPress={async () => {
                            isShown(false);
                            if(input){
                                await createPdf(mulHtml(photo),input)
                                navigation.navigate('Camera',{
                                    photo:[],
                                })
                            }
                        }}/>
                </Dialog.Container>
            </ScrollView>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {isShown(true)}}
            >
                <Icon name="check" size={50} color={"white"}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button:{
        alignSelf: 'center',
        height: '10%',
        width: '100%',
        backgroundColor: 'black',
        borderStyle:'solid',
        borderWidth: 4,
        borderRadius: 15,
        borderColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    prev: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '2%',
    },
    photo: {
        backgroundColor: '#fff',
        width: 173,
        height: 230,
        resizeMode: 'contain',
        margin: '2%',
    },
    Index: {
        fontSize:18,
        textAlign:'center',
        right:10
    },
});
