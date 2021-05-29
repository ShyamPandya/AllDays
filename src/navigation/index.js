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
import PreviewPost from '../screens/previewPost';
import SignOut from '../screens/signout';
import DrawerContent from './drawerContent';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawer.png',
            }}
            style={{
              width: 30,
              height: 30,
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 330}}>
        <AntDesign name={'shoppingcart'} size={30} color={'black'} />
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
        }}>
        {props => <HomePage {...props} userInfo={rootProps.userInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const ProfilePageStack = rootProps => {
  return (
    <Stack.Navigator initialRouteName="ProfilePage">
      <Stack.Screen
        name="ProfilePage"
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={rootProps.navigation} />
          ),
          headerShown: false,
        }}>
        {props => <ProfilePage {...props} userInfo={rootProps.userInfo} />}
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PreviewPost"
        component={PreviewPost}
      />
      <Stack.Screen
        options={{
          headerShown: false,
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
          title: '',
          headerStyle: {
            backgroundColor: '#d4d6dc', //Set Header color
          },
        }}
        name="SignOut"
        component={SignOut}
      />
    </Stack.Navigator>
  );
};

const DrawerComponent = rootProps => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomePage">
        {props => <HomePageStack {...props} userInfo={rootProps.userInfo} />}
      </Drawer.Screen>
      <Drawer.Screen name="ProfilePage">
        {props => <ProfilePageStack {...props} userInfo={rootProps.userInfo} />}
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
  );
};

const RootNavigation = rootProps => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen name="Drawer" options={{headerShown: false}}>
          {props => (
            <DrawerComponent {...props} userInfo={rootProps.userInfo} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="VideoPage"
          options={{headerShown: false}}
          component={Video}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
