import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {API, graphqlOperation} from 'aws-amplify';
import {createUser} from '../graphql/mutations';

const brandData = [
  {
    item: 'Glossier',
    id: 1,
  },
  {
    item: 'Drunk Elephant',
    id: 2,
  },
  {
    item: 'Tatcha',
    id: 3,
  },
  {
    item: 'Tata Harper',
    id: 4,
  },
  {
    item: 'Chanel',
    id: 5,
  },
  {
    item: "Vintner's Daughter",
    id: 6,
  },
  {
    item: 'Peter Thomas Roth',
    id: 7,
  },
  {
    item: 'Augustinus Bader',
    id: 8,
  },
  {
    item: 'Skinceuticals',
    id: 9,
  },
  {
    item: 'Biossance',
    id: 10,
  },
];

const categoryData = [
  {
    item: 'Anti-Aging',
    id: 1,
  },
  {
    item: 'Color Correction',
    id: 2,
  },
  {
    item: 'Acne',
    id: 3,
  },
  {
    item: 'Brightening',
    id: 4,
  },
  {
    item: 'Deep-cleaning',
    id: 5,
  },
  {
    item: 'Dark Circles',
    id: 6,
  },
  {
    item: 'Dermatologist Reviewed',
    id: 7,
  },
  {
    item: 'Rosacea',
    id: 8,
  },
  {
    item: 'Oil-prone/ T-zone',
    id: 9,
  },
  {
    item: 'Clean',
    id: 10,
  },
];

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
];

const Questionnaire = props => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userName, setUserName] = useState('');

  const onMultiChangeBrand = () => {
    return item => setSelectedBrands(xorBy(selectedBrands, [item], 'id'));
  };

  const onMultiChangeCategory = () => {
    return item =>
      setSelectedCategories(xorBy(selectedCategories, [item], 'id'));
  };

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  const createDbUser = async () => {
    console.log(props.userInfo);
    const newUser = {
      id: props.userInfo.attributes.sub,
      email: props.userInfo.attributes.email,
      username: userName !== '' ? userName : props.userInfo.attributes.email,
      imageUri: getRandomImage(),
      brandInterest: selectedBrands.map(item => item.id),
      categoryInterest: selectedCategories.map(item => item.id),
    };

    await API.graphql(graphqlOperation(createUser, {input: newUser}));
    console.log('Added new user in DB');
    console.log(newUser);
    props.callback();
  };

  const updateUserName = text => {
    setUserName(text);
  };

  return (
    <View>
      <Text>Questionnaire</Text>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="Username"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={updateUserName}
      />
      <View>
        <SelectBox
          label="Brands interested in"
          options={brandData}
          selectedValues={selectedBrands}
          onMultiSelect={onMultiChangeBrand()}
          onTapClose={onMultiChangeBrand()}
          isMulti
        />
      </View>
      <View>
        <SelectBox
          label="Categories interested in"
          options={categoryData}
          selectedValues={selectedCategories}
          onMultiSelect={onMultiChangeCategory()}
          onTapClose={onMultiChangeCategory()}
          isMulti
        />
      </View>
      <Button title="Submit" color="#841584" onPress={() => createDbUser()} />
    </View>
  );
};

export default Questionnaire;
