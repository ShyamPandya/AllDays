import React, { useEffect, useState, useRef } from "react";
import {SafeAreaView, StatusBar, Text} from 'react-native';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getUser} from "./src/graphql/queries";
import Questionnaire from './src/questionnaire';

const button = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#727563' });
const sectionFooter = Object.assign({}, AmplifyTheme.sectionFooterLink, { color: '#37383a' });
const disabledButton = Object.assign({}, AmplifyTheme.buttonDisabled, { backgroundColor: '#72756380' });
const disabledSectionFooter = Object.assign({}, AmplifyTheme.sectionFooterLinkDisabled, { color: '#37383a80' });
const MyTheme = Object.assign({}, AmplifyTheme, { button: button, buttonDisabled: disabledButton,
  sectionFooterLink: sectionFooter, sectionFooterLinkDisabled: disabledSectionFooter});

const App: () => React$Node = () => {
  const [newUser, setNewUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({byParseCache: true})
      setLoggedInUser(userInfo);
      const userDb = await API.graphql(
        graphqlOperation(
          getUser,
          {id: userInfo.attributes.sub}
        )
      );
      if (userDb.data.getUser) {
        console.log("User already exists in DB");
        setNewUser(false);
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
          <Questionnaire callback = {updateUserStatus} userInfo={loggedInUser} /> :
          <RootNavigation userInfo={loggedInUser} />}
      </SafeAreaView>
    </>
  );
};

export default withAuthenticator(App, false, [], null, MyTheme);
