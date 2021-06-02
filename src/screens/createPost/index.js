import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Storage, API, graphqlOperation} from 'aws-amplify';
import {useRoute, useNavigation, StackActions} from '@react-navigation/native';
import styles from './styles';
import {createPost} from '../../graphql/mutations';
import RNPickerSelect from 'react-native-picker-select';
import {brandData, categoryData} from '../../assets/constants/index';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videoKey, setVideoKey] = useState('');

  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async () => {
    try {
      const response = await fetch(route.params.videoUri);
      console.log(response);

      const blob = await response.blob();
      console.log(blob);

      const filename = `${uuidv4()}.mp4`;
      console.log(filename);

      const s3Response = await Storage.put(filename, blob);
      console.log('Stored');
      setVideoKey(s3Response.key);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    uploadToStorage();
  }, []);

  const onPublish = async () => {
    try {
      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: route.params.userId,
        brandTag: selectedBrand,
        categoryTag: selectedCategory,
      };
      console.log(newPost);

      await API.graphql(graphqlOperation(createPost, {input: newPost}));
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      console.error(error);
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
      <View style={{paddingTop: 30}}>
        {videoKey === '' ? (
          <Text style={styles.textStyle}> Storing the video, please wait.</Text>
        ) : (
          <Button
            title={'Publish'}
            color="#727563"
            onPress={() => onPublish()}
          />
        )}
      </View>
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
