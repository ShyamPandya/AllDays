import React, {useState} from 'react';
import styles from './styles';
import {TouchableOpacity, TouchableWithoutFeedback, View, Text} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PostPreview = () => {
  const [paused, setPaused] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const postVideo = () => {
    navigation.navigate('CreatePost', {videoUri: route.params.videoUri});
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <Video
          source={{uri: route.params.videoUri}}
          style={styles.video}
          resizeMode={'cover'}
          repeat={true}
          paused={paused}
        />
      </TouchableWithoutFeedback>
      <View style={styles.uiContainer}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={postVideo} style={styles.confirmButton}>
            <MaterialIcons name={'send'} size={50} color={'#727563'} />
          </TouchableOpacity>
          <Text style={styles.confirmText}>Continue ?</Text>
        </View>
      </View>
    </View>
  );
};

export default PostPreview;
