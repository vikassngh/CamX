import * as React from 'react';
import {View, Image, ScrollView, TouchableOpacity, Text, StyleSheet, Alert, Platform} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context/src/SafeAreaView";
import Icon from "react-native-vector-icons/MaterialIcons";
import {createPDF} from '../utils/helper';
import * as ImagePicker from 'react-native-image-picker';

export default class ImgToPdf extends React.Component {
    state = {
        photo: [],
    }

    render() {
        const {photo} = this.state
        const {navigation} = this.props
        return (
            <SafeAreaView forceInset={{top: 'always'}}>
                <ScrollView style={{height: '100%'}}>
                    <View style={styles.Prev}>
                        {photo.map((value, idx) => (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('EDIT', {
                                            photo: photo,
                                            idx: idx
                                        });
                                    }}
                                >
                                    {photo[idx] && <Image style={styles.photo} key={idx} source={photo[idx]}/>}
                                </TouchableOpacity>
                                <Text style={styles.Index}>{idx + 1}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{position: 'absolute', flexDirection: 'row', top: 500, alignSelf: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.addImg()}
                        >
                            <Icon name="add" size={50} color={"white"}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={createPDF(photo)}
                        >
                            <Icon name="check" size={50} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    addImg = () => async () => {
        const photo = this.state.photo
        const options = {
            mediaType:'photo',
            includeBase64: Platform.OS === "ios",
        }
        ImagePicker.launchImageLibrary(options, response => {
            if( response.didCancel === true){
                return;
            } else {
                photo.push(response);
            }
        });
        this.setState({photo})
    }

}

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: 60,
        zIndex: 3,
        backgroundColor: 'black',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 100
    },
    Prev: {
        height: 600,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '2%',
    },
    photo: {
        backgroundColor: '#fff',
        width: 188,
        height: 250,
        resizeMode: 'contain',
        margin: '2%',
    },
    Index: {
        fontSize: 18,
        textAlign: 'center',
        right: 10
    },
});
