import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Thumbnails from '../../components/ScrollableThumbnails';

const HomePage = props => {
  return (
    <View>
      <Text>Home Page</Text>
      <ScrollView scrollEventThrottle={16}>
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 50}}>
          <Text
            style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
            Brands
          </Text>
        </View>
        <Thumbnails userInfo={props.userInfo} />
      </ScrollView>
    </View>
  );
};

export default HomePage;
