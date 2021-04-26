/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import {withAuthenticator} from 'aws-amplify-react-native';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createUser } from "./src/graphql/mutations";
import {getUser} from "./src/graphql/queries";

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg'
]

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random()*randomImages.length)]
}

const App: () => React$Node = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({byParseCache: true})
      const userDb = await API.graphql(
        graphqlOperation(
          getUser,
          {id: userInfo.attributes.sub}
        )
      );
      if (userDb.data.getUser) {
        console.log("User already exists in DB");
        return;
      }

      // Create a new user
      const newUser = {
        id: userInfo.attributes.sub,
        email: userInfo.attributes.email,
        username: userInfo.attributes.email,
        imageUri: getRandomImage()
      };

      await API.graphql(
        graphqlOperation(
          createUser,
          {input: newUser}
        )
      )
      console.log("Added new user in DB");
    };
    fetchUser();
  }, []);
  return (
    <>
      <StatusBar barStyle = "light-content"/>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <RootNavigation/>
      </SafeAreaView>
    </>
  );
};

export default withAuthenticator(App);
