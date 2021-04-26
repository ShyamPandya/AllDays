import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';

import styles from './styles';
import {createPost} from '../../graphql/mutations';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async imagePath => {
    try {
      console.log('In storage upload');
      console.log(imagePath);
      const response = await fetch(imagePath);
      console.log('Response');
      console.log(response);

      const blob = await response.blob();

      const filename = `${uuidv4()}.mp4`;
      console.log('Blob');
      console.log(blob);
      console.log('FileName');
      console.log(filename);
      const s3Response = await Storage.put(filename, blob);
      console.log('S3 Response');
      console.log(s3Response);

      setVideoKey(s3Response.key);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('In use effect');
    uploadToStorage(route.params.videoUri);
  }, [route.params.videoUri]);

  const onPublish = async () => {
    console.log('In publish');
    // create post in the database (API)
    if (!videoKey) {
      console.warn('VIdeo is not yet uploaded');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
      };

      await API.graphql(graphqlOperation(createPost, {input: newPost}));
      navigation.navigate('ProfilePage', {screen: 'ProfilePage'});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        numberOfLines={5}
        placeholder={'Description'}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
