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
    navigation.navigate('HomePage', {screen: 'HomePage'});
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: '',
          fontSize: 30,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        Are you sure you want to sign out?
      </Text>
      <View style={{paddingTop: 20, paddingBottom: 20}}>
        <Button onPress={logOut} title="Yes" color="#727563" />
      </View>
      <View style={{paddingTop: 20, paddingBottom: 20}}>
        <Button onPress={goBack} title="No" color="grey" />
      </View>
    </View>
  );
};

export default SignOut;
