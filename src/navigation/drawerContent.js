import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const DrawerContent = props => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          source={{
            uri: 'https://pngimg.com/uploads/bmw_logo/bmw_logo_PNG19707.png',
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: '#fff',
            marginTop: 25,
            marginLeft: 15,
          }}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <DrawerItem
            label={'Home'}
            onPress={() => {
              props.navigation.navigate('HomePage');
            }}
          />
          <DrawerItem
            label={'Profile'}
            onPress={() => {
              props.navigation.navigate('ProfilePage');
            }}
          />
          <DrawerItem
            label={'Videos'}
            onPress={() => {
              props.navigation.navigate('VideoPage');
            }}
          />
          <DrawerItem
            label={'Upload'}
            onPress={() => {
              props.navigation.navigate('UploadPage');
            }}
          />
          <DrawerItem
            label={'Sign Out'}
            onPress={() => {
              props.navigation.navigate('SignOutPage');
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: '100%',
    backgroundColor: '#8f9a9f',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
});

export default DrawerContent;
