import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {createPost} from '../../graphql/mutations';
import RNPickerSelect from 'react-native-picker-select';
import {brandData, categoryData} from '../../assets/constants/index';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async imagePath => {
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();

      const filename = `${uuidv4()}.mp4`;
      const s3Response = await Storage.put(filename, blob);
      setVideoKey(s3Response.key);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    uploadToStorage(route.params.videoUri);
  }, [route.params.videoUri]);

  const onPublish = async () => {
    console.log('In publish');
    // create post in the database (API)
    if (!videoKey) {
      console.warn('Video is not yet uploaded');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        brandTag: selectedBrand,
        categoryTag: selectedCategory,
      };

      console.log(newPost);

      await API.graphql(graphqlOperation(createPost, {input: newPost}));
      navigation.navigate('HomePage', {screen: 'HomePage'});
    } catch (e) {
      console.error(e);
    }
  };

  const updateCategory = val => {
    setSelectedCategory(val);
  };

  const updateBrand = val => {
    setSelectedBrand(val);
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
      <Text style={styles.textStyle}>
        What category does the video relate to?
      </Text>
      <RNPickerSelect
        onValueChange={val => updateCategory(val)}
        items={Object.values(categoryData)}
        placeholder={{
          label: 'Select a category...',
          value: null,
          color: 'black',
        }}
        style={pickerSelectStyles}
        value={selectedCategory}
      />
      <Text style={styles.textStyle}>What brand does the video relate to?</Text>
      <RNPickerSelect
        onValueChange={val => updateBrand(val)}
        items={Object.values(brandData)}
        placeholder={{
          label: 'Select a brand...',
          value: null,
          color: 'black',
        }}
        style={pickerSelectStyles}
        value={selectedBrand}
      />
      <TouchableOpacity onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default CreatePost;
