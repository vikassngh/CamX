import * as React from 'react';
import {View, Image, ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context/src/SafeAreaView";
import Icon from "react-native-vector-icons/MaterialIcons";
import {createPdf, mulHtml} from '../utils/helper';
import * as ImagePicker from 'react-native-image-picker';
import Dialog from 'react-native-dialog';

export default class ImgToPdf extends React.Component {
    state = {
        photo: [],
        input:'',
        isDialogVisible: false,
    }
    showDialog(isShow){
        this.setState({isDialogVisible: isShow});
    }

    render() {
        const {photo,input,isDialogVisible} = this.state
        const {navigation} = this.props
        return (
            <SafeAreaView forceInset={{top: 'always'}}>
                <ScrollView style={{height: '90%'}}>
                    <View style={styles.prev}>
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
                </ScrollView>
                <Dialog.Container visible={isDialogVisible}>
                    <Dialog.Title>Enter PDF Name</Dialog.Title>
                    <Dialog.Input label="Enter Input" onChangeText={(value) => this.setState({input:value})}/>
                    <Dialog.Button label="Cancel" onPress={() => {this.showDialog(false)}} />
                    <Dialog.Button
                        label="Done"
                        onPress={()=>{
                            this.showDialog(false)
                            createPdf(mulHtml(photo),input)
                        }}/>
                </Dialog.Container>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.buttonL}
                        onPress={this.addImg()}
                    >
                        <Icon name="add" size={50} color={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonR}
                        onPress={() => {
                            this.showDialog(true);
                            if (!isDialogVisible){
                                createPdf(mulHtml(photo),input);
                            }
                        }}
                    >
                        <Icon name="check" size={50} color={"white"}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    addImg = () => async () => {
        const photo = this.state.photo
        const options = {
            mediaType:'photo',
            includeBase64: true,
            quality:0.1,
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
    buttonView: {
        flexDirection:'row',
        backgroundColor:'transparent',
        width:'100%',
        height:'10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonL: {
        height: '90%',
        width: '15%',
        borderStyle:'solid',
        borderWidth: 2,
        borderRadius: 10,
        borderColor:'white',
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:'30%'

    },
    buttonR: {
        height: '90%',
        width: '15%',
        borderStyle:'solid',
        borderWidth: 2,
        borderRadius: 10,
        borderColor:'white',
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:'30%'
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
        fontSize: 18,
        textAlign: 'center',
        right: 10
    },
});
