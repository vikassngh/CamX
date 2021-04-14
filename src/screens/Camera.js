import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';

export default class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flashMode: RNCamera.Constants.FlashMode.off,
            photo: props.route.params.photo,
            type: RNCamera.Constants.Type.back,
            autoFocus: RNCamera.Constants.AutoFocus.on,
            ratio:'4:3',
        };
    }

    render() {
        let {
            photo,
            flashMode,
            type,
            autoFocus,
            ratio,
        } = this.state;
        const {navigation} = this.props;
        return (
            <SafeAreaView forceInset={{top: 'always'}} style={{flex: 1, backgroundColor: 'black'}}>
                <StatusBar hidden={true}/>
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={type}
                        flashMode={flashMode}
                        autoFocus={autoFocus}
                        ratio={ratio}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                    />
                    <View style={styles.topStack}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.setState({photo: []});
                                navigation.navigate('Home');
                            }}>
                            <Text style={styles.text}> Cancel </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonIcon}
                            onPress={() => {
                                this.setState({
                                    flashMode: flashMode === RNCamera.Constants.FlashMode.off
                                        ? RNCamera.Constants.FlashMode.torch
                                        : RNCamera.Constants.FlashMode.off,
                                });
                            }}>
                            {flashMode === RNCamera.Constants.FlashMode.off
                                ? <Icon name="flash-off" size={30} color={'white'}/>
                                : <Icon name="flash-on" size={30} color={'white'}/>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomStack}>
                        <TouchableOpacity
                            style={{
                                marginLeft: 15,
                                marginRight: 35,
                                height: 80, width: 80,
                                backgroundColor: 'black',
                            }}
                            onPress={() => {
                                photo[0] && navigation.navigate('Preview', {
                                    photo: photo,
                                });
                            }}>
                            {photo.map((value, idx) => (
                                photo && <Image style={styles.photo} key={idx} source={photo[idx]}/>
                            ))}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.shutterButton}
                            onPress={this.takePicture}
                        />
                        {photo[0] && <TouchableOpacity
                            style={{marginVertical: 10, marginHorizontal: 35}}
                            onPress={() => {
                                navigation.navigate('Preview', {
                                    photo: photo,
                                });
                            }}>
                            <Icon name="check-box" size={60} color={'deepskyblue'}/>
                        </TouchableOpacity>}
                    </View>
                </View>
            </SafeAreaView>
        );
    }


    takePicture = async () => {
        const {navigation} = this.props;
        if (this.camera) {
            const photo = this.state.photo;
            const options = {quality: 0.2, base64: true};
            const img = await this.camera.takePictureAsync(options);
            photo.push(img);
            /*navigation.navigate('Edit',{
                photo:photo,
                idx:idx-1,
            });*/
            this.setState({photo});
        }
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop:'20%',
        marginBottom:'32%',
    },
    button: {
        marginLeft: 20,
        marginRight: 30,
        marginVertical: 25,
    },
    buttonIcon: {
        marginLeft: 225,
        marginVertical: 25,
    },
    topStack: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(1, 1, 1, 0.6)',
    },
    bottomStack: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: 'rgba(1, 1, 1, 0.6)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    shutterButton: {
        height: 80,
        width: 80,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 7,
        borderRadius: 40,
        marginHorizontal: 30,
    },
    text: {
        fontSize: 20,
        color: 'deepskyblue',
    },
    photo: {
        width: 80,
        height: 80,
        position: 'absolute',
    },
});
