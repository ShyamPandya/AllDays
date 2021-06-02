import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostPreview = () => {
  const [paused, setPaused] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [isFocused]);

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const postVideo = () => {
    console.log('Not going');
    navigation.push('CreatePost', {
      videoUri: route.params.videoUri,
      userId: route.params.userId,
    });
  };

  const goBackSafe = () => {
    // Traverse parent stack until we can go back
    let parent = navigation;
    while (
      parent.dangerouslyGetState()?.index === 0 &&
      parent.dangerouslyGetParent()
    ) {
      parent = parent.dangerouslyGetParent();
    }
    parent?.goBack();
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
      <View style={styles.uiContainerTop}>
        <View style={{paddingTop: 20, paddingLeft: 20}}>
          <TouchableWithoutFeedback onPress={goBackSafe}>
            <Ionicons name={'arrow-back'} size={30} color="grey" />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.uiContainerBottom}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={postVideo} style={styles.confirmButton}>
            <MaterialIcons name={'send'} size={50} color={'#727563'} />
          </TouchableOpacity>
          <Text style={styles.confirmText}>Are you sure to continue ?</Text>
        </View>
      </View>
    </View>
  );
};

export default PostPreview;
