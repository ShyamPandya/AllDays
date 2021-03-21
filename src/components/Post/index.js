import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Post = props => {
  const [post, setPost] = useState(props.post);
  const [paused, setPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const onPlayPausePress = () => {
    setPaused(!paused);
  };
  const likePress = () => {
    const likeChange = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likeChange,
    });
    setIsLiked(!isLiked);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <Video
          source={{uri: post.videoUri}}
          style={styles.video}
          resizeMode={'cover'}
          repeat={true}
          paused={paused}
        />
      </TouchableWithoutFeedback>
      <View style={styles.uiContainer}>
        <View style={styles.rightContainer}>
          <Image
            style={styles.profilePicture}
            source={{uri: post.user.imageUri}}
          />
          <TouchableOpacity style={styles.iconContainer} onPress={likePress}>
            <AntDesign name={'heart'} size={40} color={isLiked ? 'red' : 'white'} />
            <Text style={{...styles.counter, alignSelf: 'center'}}>
              {post.likes}
            </Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <FontAwesome name={'commenting'} size={40} color="white" />
            <Text style={styles.counter}>{post.comments}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Fontisto name={'share-a'} size={35} color="white" />
            <Text style={styles.counter}>{post.shares}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.handle}>@{post.user.userName}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Post;
