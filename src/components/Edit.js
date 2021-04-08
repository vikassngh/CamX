import React, { useState, useRef, useEffect } from "react";
import {Button, StatusBar, StyleSheet, View, Image} from 'react-native';
import {CropView} from 'react-native-image-crop-tools';

function Edit({route,navigation}) {

  const {photo,idx} = route.params;
  const [uri, setUri] = useState();
  const cropViewRef = useRef();

  useEffect(() => {
      const image = photo[idx].uri;
      setUri(image);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {uri !== undefined && <CropView
          sourceUrl={uri}
          style={styles.cropView}
          ref={cropViewRef}
          onImageCrop={(res) => {
            photo[idx]=res
            navigation.navigate('Preview',{
              photo:photo,
              idx:idx
            });
          }}
          aspectRatio={{width: 16, height: 9}}
        />}
        <Button
          title={'Done'}
          onPress={() => {
            cropViewRef.current.saveImage(true,100);
          }}
        />
        <Button
          title={'Rotate'}
          onPress={() => {
            cropViewRef.current.rotateImage(true);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cropView: {
    flex: 1,
    backgroundColor: 'red'
  },
});

export default Edit;
