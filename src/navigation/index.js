import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, TouchableOpacity, Image} from 'react-native';
import Video from '../screens/videos';
import ProfilePage from '../components/Profile';
import HomePage from '../screens/home';
import Camera from '../screens/camera';
import CreatePost from '../screens/createPost';
import SignOut from '../screens/signout';
import DrawerContent from './drawerContent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <View>
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
      <View style={{marginLeft: 350}}>
        <FontAwesome name={'search'} size={20} color={'white'} />
      </View>
    </View>
  );
};

const HomePageStack = rootProps => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        options={{
          title: '',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={rootProps.navigation} />
          ),
          headerStyle: {
            backgroundColor: '#d4d6dc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color,
        }}>
        {props => <HomePage {...props} userInfo={rootProps.userInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
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
            backgroundColor: '#d4d6dc', //Set Header color
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
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerShown: false,
        }}>
        {props => <Video {...props} />}
      </Stack.Screen>
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
            backgroundColor: '#d4d6dc', //Set Header color
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

const RootNavigation = rootProps => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomePage">
          {props => <HomePageStack {...props} userInfo={rootProps.userInfo} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="ProfilePage"
          options={{drawerLabel: 'Profile'}}
          component={ProfilePageStack}
        />
        <Drawer.Screen name="VideoPage">
          {props => <VideoPageStack {...props} />}
        </Drawer.Screen>
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
