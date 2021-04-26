import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, TouchableOpacity, Image} from 'react-native';
import Home from '../screens/home';
import ProfilePage from '../components/Profile';
import Camera from '../screens/camera';
import CreatePost from '../screens/createPost';
import SignOut from '../screens/signout';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const ProfilePageStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="ProfilePage">
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          title: 'Profile Page', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const VideoPageStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="VideoPage">
      <Stack.Screen
        name="VideoPage"
        component={Home}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          /*title: 'Video Page', //Set Header Title
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },*/
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const UploadPageStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="UploadPage">
      <Stack.Screen
        name="UploadPage"
        component={Camera}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Post',
        }}
        name="CreatePost"
        component={CreatePost}
      />
    </Stack.Navigator>
  );
};

const SignOutStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="SignOutPage">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerShown: true,
          title: 'Sign Out',
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
        name="SignOut"
        component={SignOut}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}>
        <Drawer.Screen
          name="ProfilePage"
          options={{drawerLabel: 'Profile'}}
          component={ProfilePageStack}
        />
        <Drawer.Screen
          name="VideoPage"
          options={{drawerLabel: 'Posts'}}
          component={VideoPageStack}
        />
        <Drawer.Screen
          name="UploadPage"
          options={{drawerLabel: 'Upload'}}
          component={UploadPageStack}
        />
        <Drawer.Screen
          name="SignOutPage"
          options={{drawerLabel: 'SignOut'}}
          component={SignOutStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
