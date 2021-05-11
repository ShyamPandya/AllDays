import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {createPost} from '../../graphql/mutations';
import RNPickerSelect from 'react-native-picker-select';

const brandData = [
  {
    label: 'Glossier',
    value: 1,
  },
  {
    label: 'Drunk Elephant',
    value: 2,
  },
  {
    label: 'Tatcha',
    value: 3,
  },
  {
    label: 'Tata Harper',
    value: 4,
  },
  {
    label: 'Chanel',
    value: 5,
  },
  {
    label: "Vintner's Daughter",
    value: 6,
  },
  {
    label: 'Peter Thomas Roth',
    value: 7,
  },
  {
    label: 'Augustinus Bader',
    value: 8,
  },
  {
    label: 'Skinceuticals',
    value: 9,
  },
  {
    label: 'Biossance',
    value: 10,
  },
];

const categoryData = [
  {
    label: 'Anti-Aging',
    value: 1,
  },
  {
    label: 'Color Correction',
    value: 2,
  },
  {
    label: 'Acne',
    value: 3,
  },
  {
    label: 'Brightening',
    value: 4,
  },
  {
    label: 'Deep-cleaning',
    value: 5,
  },
  {
    label: 'Dark Circles',
    value: 6,
  },
  {
    label: 'Dermatologist Reviewed',
    value: 7,
  },
  {
    label: 'Rosacea',
    value: 8,
  },
  {
    label: 'Oil-prone/ T-zone',
    value: 9,
  },
  {
    label: 'Clean',
    value: 10,
  },
];

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(-1);

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
      console.warn('VIdeo is not yet uploaded');
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
      navigation.navigate('ProfilePage', {screen: 'ProfilePage'});
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
      <RNPickerSelect
        onValueChange={val => updateCategory(val)}
        items={categoryData}
      />
      <RNPickerSelect
        onValueChange={val => updateBrand(val)}
        items={brandData}
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
