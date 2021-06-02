import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback, Text, Image} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Storage} from 'aws-amplify';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

const Post = props => {
  const [paused, setPaused] = useState(false);
  const [videoUri, setVideoUri] = useState('');
  const [profilePage, setProfilePage] = useState('ProfilePage');
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const openUserProfile = () => {
    setPaused(true);
    navigation.push(profilePage, {
      screen: profilePage,
      userInfo: props.post.user,
    });
  };

  useEffect(() => {
    if (isFocused) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (route.name === 'UserVideoPage') {
      setProfilePage('UserProfilePage');
    }
    const setupVideoUri = async () => {
      if (props.post.videoUri.startsWith('http')) {
        setVideoUri(props.post.videoUri);
      } else {
        setVideoUri(await Storage.get(props.post.videoUri));
      }
    };
    setupVideoUri();
  }, []);

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
          source={{uri: videoUri}}
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
          <Image
            style={styles.profilePicture}
            source={{uri: props.post.user.imageUri}}
          />
          <View>
            <TouchableWithoutFeedback onPress={openUserProfile}>
              <Text style={styles.handle}>@{props.post.user.username}</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.description}>{props.post.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;

/*

 const likePress = () => {
    const likeChange = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likeChange,
    });
    setIsLiked(!isLiked);
  };

 <View style={styles.rightContainer}>
   <TouchableOpacity style={styles.iconContainer} onPress={likePress}>
     <AntDesign
       name={'heart'}
       size={40}
       color={isLiked ? 'red' : 'white'}
     />
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
*/
