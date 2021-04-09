import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context/src/SafeAreaView";
import Icon from "react-native-vector-icons/MaterialIcons";
import {createPDF, mulHtml} from '../utils/helper';

export default function Preview({route, navigation}) {

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
            </ScrollView>
            <TouchableOpacity
                style={styles.button}
                // onPress={createPDF(mulHtml(photo))}
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
