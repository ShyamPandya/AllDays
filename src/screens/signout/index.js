import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const SignOut = () => {
  const navigation = useNavigation();

  const logOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const goBack = () => {
    navigation.navigate('ProfilePage', {screen: 'ProfilePage'});
  };

  return (
    <View>
      <Text>Are you sure you want to sign out?</Text>
      <Button onPress={logOut} title="Yes" color="#841584" />
      <Button onPress={goBack} title="No" color="#841584" />
    </View>
  );
};

export default SignOut;
