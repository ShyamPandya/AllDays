import React, {useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Camera = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const camera = useRef();

  const navigation = useNavigation();

  const toggleCamera = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };

  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync({maxDuration: 60});
      navigation.navigate('PreviewPost', {videoUri: data.uri});
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        onRecordingStart={() => setIsRecording(true)}
        onRecordingEnd={() => setIsRecording(false)}
        style={styles.preview}
        type={cameraType}
      />
      <View style={{flexDirection: 'row'}}>
        {!isRecording && (
          <TouchableOpacity
            onPress={toggleCamera}
            style={{alignSelf: 'flex-start', padding: 20}}>
            <Ionicons
              name={'camera-reverse-outline'}
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onRecord}
          style={isRecording ? styles.buttonStop : styles.buttonRecord}
        />
      </View>
    </View>
  );
};

export default Camera;
