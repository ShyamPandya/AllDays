import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {createPost} from '../../graphql/mutations';
import RNPickerSelect from 'react-native-picker-select';
import {brandData, categoryData} from '../../assets/constants/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async imagePath => {
    console.log('Trying to upload to S3');
    try {
      const response = await fetch(imagePath);
      console.log(response);

      const blob = await response.blob();
      console.log(blob);

      const filename = `${uuidv4()}.mp4`;
      const s3Response = await Storage.put(filename, blob);
      setVideoKey(s3Response.key);
      console.log('Stored');
    } catch (e) {
      console.error(e);
    }
  };

  const onPublish = async () => {
    await uploadToStorage(route.params.videoUri);
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
      <View style={{paddingTop: 20, paddingLeft: 20}}>
        <TouchableWithoutFeedback onPress={goBackSafe}>
          <Ionicons name={'arrow-back'} size={30} color="grey" />
        </TouchableWithoutFeedback>
      </View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        numberOfLines={5}
        placeholder={'Description'}
        placeholderTextColor={'black'}
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
      <Button
        style={{paddingTop: 20, paddingLeft: 20}}
        title={'Publish'}
        color="#727563"
        onPress={() => onPublish()}
      />
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
