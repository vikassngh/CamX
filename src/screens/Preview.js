import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context/src/SafeAreaView";
// import {createPdf, mulHtml} from "../Utils/helpers";
import Icon from "react-native-vector-icons/MaterialIcons";
import {createPDF} from "../utils/helper";

export default function Preview({route, navigation}) {

    const {photo} = route.params

    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <ScrollView style={{height:'100%',backgroundColor:"rgba(255,255,255, 0.5)"}}>
                <View style={styles.Prev}>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={createPDF(photo)}
                >
                    <Icon name="check" size={50} color={"white"}/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button:{

        alignSelf: 'center',
        height: 60,
        width: 60,
        zIndex: 3,
        backgroundColor: 'black',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Prev: {
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
