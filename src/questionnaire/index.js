import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {API, graphqlOperation} from 'aws-amplify';
import {createUser} from '../graphql/mutations';
import {brandData, categoryData} from '../assets/constants/index';

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
    props.callback(newUser);
  };

  const updateUserName = text => {
    setUserName(text);
  };

  return (
    <View>
      <Text
        style={{paddingTop: 20, paddingLeft: 20, fontSize: 30, fontFamily: ''}}>
        Some additional details
      </Text>
      <View style={{paddingTop: 20, paddingLeft: 20}}>
        <Text style={{fontSize: 20, fontFamily: ''}}>
          Enter you user handle
        </Text>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={'Username'}
          placeholderTextColor={'black'}
          autoCapitalize="none"
          onChangeText={updateUserName}
          color={'black'}
        />
      </View>
      <View style={{paddingTop: 20, paddingLeft: 20}}>
        <Text style={{fontSize: 20, fontFamily: ''}}>
          What brands are you interested in?
        </Text>
        <SelectBox
          label=""
          options={Object.values(brandData)}
          selectedValues={selectedBrands}
          onMultiSelect={onMultiChangeBrand()}
          onTapClose={onMultiChangeBrand()}
          isMulti
          arrowIconColor={'#727563'}
          searchIconColor={'#727563'}
          toggleIconColor={'#727563'}
          multiOptionContainerStyle={{backgroundColor: '#727563'}}
        />
      </View>
      <View style={{paddingTop: 20, paddingLeft: 20}}>
        <Text style={{fontSize: 20, fontFamily: ''}}>
          What categories are you interested in?
        </Text>
        <SelectBox
          label=""
          options={Object.values(categoryData)}
          selectedValues={selectedCategories}
          onMultiSelect={onMultiChangeCategory()}
          onTapClose={onMultiChangeCategory()}
          isMulti
          arrowIconColor={'#727563'}
          searchIconColor={'#727563'}
          toggleIconColor={'#727563'}
          multiOptionContainerStyle={{backgroundColor: '#727563'}}
        />
      </View>
      <Button
        style={{paddingTop: 20, paddingLeft: 20}}
        title={'Submit'}
        color="#727563"
        onPress={() => createDbUser()}
      />
    </View>
  );
};

export default Questionnaire;
