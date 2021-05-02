import React, { useEffect, useState, useRef } from "react";
import {SafeAreaView, StatusBar, Text} from 'react-native';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import {withAuthenticator} from 'aws-amplify-react-native';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getUser} from "./src/graphql/queries";
import Questionnaire from './src/questionnaire';

const App: () => React$Node = () => {
  const [newUser, setNewUser] = useState(null);

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
        setNewUser(true);
      } else {
        console.log("User doesn't exists in DB");
        setNewUser(true);
      }
    };
    fetchUser();
  }, []);

  const updateUserStatus = () => {
    setNewUser(!newUser);
  };

  return (
    <>
      <StatusBar barStyle = "light-content"/>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        {newUser == null ? null : newUser ?
          <Questionnaire callback = {updateUserStatus} /> : <RootNavigation/>}
      </SafeAreaView>
    </>
  );
};

export default withAuthenticator(App);
