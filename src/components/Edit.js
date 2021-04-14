import React, {useState, useRef, useEffect} from 'react';
import {StatusBar, StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {CropView} from 'react-native-image-crop-tools';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigationState} from '@react-navigation/native';

export default function Edit({route, navigation}) {
    const {photo, idx} = route.params;
    const [uri, setUri] = useState();
    const cropViewRef = useRef();


    const index = useNavigationState(state => state.index);

    useEffect(() => {
        const image = photo[idx].uri;
        setUri(image);
    }, []);

    return (
        <SafeAreaView forceInset={{top: 'always'}} style={{flex: 1, backgroundColor: 'black'}}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.tStack}>
                <TouchableOpacity
                    style={{marginVertical: 30, marginLeft: 325}}
                    onPress={() => {
                        photo.splice(idx, 1);
                        if (photo[0]) {
                          if(index === 2){
                            navigation.navigate('imgToPdf', {
                              photo: photo
                            });
                          } else {
                            navigation.navigate('Preview', {
                              photo: photo
                            });
                          }
                        } else {
                            navigation.navigate('Camera', {
                                photo: photo,
                            });
                        }

                    }}
                >
                    <Icon name="delete-outline" size={42} color={'orangered'}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                {uri !== undefined && <CropView
                    sourceUrl={uri}
                    style={{flex: 1}}
                    ref={cropViewRef}
                    onImageCrop={(res) => {
                        photo[idx] = res;
                        if(index === 2){
                          navigation.navigate('imgToPdf', {
                            photo: photo,
                          });
                        } else {
                          navigation.navigate('Preview', {
                            photo: photo
                          });
                        }
                    }}
                    aspectRatio={{width: 16, height: 9}}
                />}
            </View>
            <View style={styles.bStack}>
                <TouchableOpacity
                    style={{marginVertical: 20, marginLeft: 30, marginRight: 75}}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="cancel" size={42} color={'orangered'}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginVertical: 20, marginHorizontal: 30}}
                    onPress={() => {
                        cropViewRef.current.rotateImage(true);
                    }}
                >
                    <Icon name="rotate-left" size={42} color={'white'}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginVertical: 20, marginLeft: 75, marginRight: 30}}
                    onPress={() => {
                        cropViewRef.current.saveImage(true, 100);
                    }}
                >
                    <Icon name="check-circle" size={42} color={'deepskyblue'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tStack: {
        display: 'flex',
        top: 0,
        flexDirection: 'row',
    },
    bStack: {
        display: 'flex',
        bottom: 0,
        flexDirection: 'row',
    },
});
