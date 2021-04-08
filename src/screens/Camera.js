import React from 'react';
import {StyleSheet, Text, View, Platform, Image, TouchableOpacity, Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import {SafeAreaView} from "react-native-safe-area-context/src/SafeAreaView";

export default class Camera extends React.Component {
    state = {
        hasCameraPermission: false,
        flashMode: RNCamera.Constants.FlashMode.off,
        autoFocus: RNCamera.Constants.AutoFocus.on,
        ratio: '4:3',
        photo:[],
    }

    render() {
        let {
            hasCameraPermission,
            flashMode,
            autoFocus,
            ratio,
            photo,
        } = this.state

        const {navigation}=this.props

        if (!hasCameraPermission) {
            return <View style={styles.container} />
        }

        return (
            <SafeAreaView forceInset={{top:'always'}} style={{flex:1,backgroundColor: "black"}}>
                <View style={styles.container}>
                    <RNCamera style={styles.camera}
                              flashMode={flashMode} ratio={ratio}
                              // autoFocus={autoFocus}
                              ref={ref => (this._camera = ref)}
                              androidCameraPermissionOptions={{
                                  title: 'Permission to use camera',
                                  message: 'We need your permission to use your camera',
                                  buttonPositive: 'Ok',
                                  buttonNegative: 'Cancel',
                              }}
                              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                  console.log(barcodes);
                              }}
                    >
                        <View style={styles.topStack}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.setState({ photo:[] })
                                    navigation.navigate('Home');
                                }}>
                                <Text style={styles.text}> Cancel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonIcon}
                                onPress={()=>{
                                    this.setState({
                                        flashMode: flashMode === Camera.Constants.FlashMode.off
                                            ? Camera.Constants.FlashMode.on
                                            : Camera.Constants.FlashMode.off
                                    });
                                }}>
                                <Icon name="flash-on" size={30} color={"white"}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomStack}>
                            <TouchableOpacity
                                style={{marginLeft:15,
                                    marginRight:35,
                                    height:80,width:80,
                                    backgroundColor: 'black'}}
                                onPress={() => {
                                    navigation.navigate('Preview',{
                                        photo:photo
                                    });
                                }}>
                                {photo.map((value, idx) => (
                                    photo && <Image style={styles.photo} key={idx} source={photo[idx]}/>
                                ))}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.shutterButton}
                                onPress={this._takePictureButtonPressed.bind(this)}
                            />
                            <TouchableOpacity
                                style={{marginVertical:10,marginHorizontal:35}}
                                /*onPress={() => {
                                    navigation.navigate('Preview',{
                                        photo:photo
                                    });
                                }}*/>
                                <Icon name="check-box" size={60} color={"deepskyblue"}/>
                            </TouchableOpacity>
                        </View>
                    </RNCamera>
                </View>
            </SafeAreaView>
        )
    }


    _takePictureButtonPressed = async () => {
        const {navigation}=this.props
        if (this._camera) {
            const photo=this.state.photo
            const img=await this._camera.takePictureAsync({base64:Platform.OS === "ios"})
            photo.push(img)
            // navigation.navigate('EDIT',{
            //     photo:img
            // });
            this.setState({ photo })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    camera: {
        flex: 1,
    },
    button: {
        marginLeft:20,
        marginRight:30,
        marginVertical:25,
    },
    buttonIcon: {
        marginLeft:225,
        marginVertical:25,
    },
    topStack:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:"rgba(1, 1, 1, 0.6)",
    },
    bottomStack:{
        display:"flex",
        flexDirection:"row",
        paddingBottom:20,
        paddingTop:20,
        backgroundColor:"rgba(1, 1, 1, 0.6)",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    shutterButton:{
        height:80,
        width:80,
        backgroundColor:'white',
        borderColor:"grey",
        borderWidth:7,
        borderRadius:40,
        marginHorizontal:30,
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
