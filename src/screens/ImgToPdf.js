import * as React from 'react';
import {View, Image, ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createPdf, mulHtml, randomColor} from '../utils/helper';
import * as ImagePicker from 'react-native-image-picker';
import Dialog from 'react-native-dialog';

export default class ImgToPdf extends React.Component {
    state = {
        photo: [],
        input: undefined,
        isVisible: false,
    };

    render() {
        const {photo, input, isVisible} = this.state;
        const {navigation} = this.props;
        if (photo.length === 0) {
            return (
                <TouchableOpacity
                    style={styles.addFullButton}
                    onPress={this.addImg()}
                >
                    <View style={{backgroundColor: 'rgba(110,110,109,0.7)', borderRadius: 50}}>
                        <Icon name="add" size={90} color={'white'}/>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <SafeAreaView forceInset={{top: 'always'}}>
                    <ScrollView style={{height: '90%'}}>
                        <View style={styles.prev}>
                            {photo.map((value, idx) => (
                                <TouchableOpacity
                                    style={styles.cardPrev}
                                    onPress={() => {
                                        navigation.navigate('Edit', {
                                            photo: photo,
                                            idx: idx,
                                        });
                                    }}
                                >
                                    {photo[idx] && <Image style={styles.photo} key={idx} source={photo[idx]}/>}
                                    <Text style={styles.Index}>{idx + 1}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={this.addImg()}
                            >
                                <View style={{backgroundColor: 'rgba(110,110,109,0.7)', borderRadius: 50}}>
                                    <Icon name="add" size={70} color={'white'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <Dialog.Container visible={isVisible}>
                        <Dialog.Title>Enter PDF Name (without .pdf extension):</Dialog.Title>
                        <Dialog.Input
                            placeholder="Enter Input"
                            style={{fontSize: 18}}
                            onChangeText={(value) => this.setState({input: value})}/>
                        <Dialog.Button
                            label="Cancel"
                            style={{fontSize: 18}}
                            onPress={() => this.setState({isVisible: false})}/>
                        <Dialog.Button
                            label="Done"
                            style={{fontSize: 18}}
                            onPress={async () => {
                                this.setState({isVisible: false});
                                if (input) {
                                    await createPdf(mulHtml(photo), input);
                                    this.setState({photo: []});
                                }
                            }}/>
                    </Dialog.Container>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.setState({isVisible: true});
                        }}
                    >
                        <Icon name="check" size={50} color={'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>
            );
        }
    }

    addImg = () => async () => {
        const photo = this.state.photo;
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.2,
        };
        await ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel === true) {
            } else {
                photo.push(response);
                this.setState({photo});
            }
        });
    };

}

const styles = StyleSheet.create({
    prev: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    addButton: {
        width: 179,
        height: 235,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(110,110,109,0.4)',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 10,
        paddingVertical: '1%',
        margin: '1%',
    },
    addFullButton: {
        width: '98%',
        height: '99%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(110,110,109,0.4)',
        borderWidth: 10,
        borderColor: 'white',
        borderRadius: 30,
        paddingVertical: '1%',
        margin: '1%',
    },
    cardPrev: {
        backgroundColor: randomColor(),
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 10,
        paddingVertical: '1%',
        margin: '1%',
    },
    photo: {
        width: 159,
        height: 215,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: '2%',
        borderRadius: 5,
    },
    Index: {
        fontSize: 22,
        width: '92%',
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontFamily: 'mono',
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        margin: '2%',
    },
    button: {
        alignSelf: 'center',
        height: '10%',
        width: '95%',
        backgroundColor: randomColor(),
        borderStyle: 'solid',
        borderWidth: 4,
        borderRadius: 15,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
