import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Thumbnails from './scrollableThumbnails';

const HomePage = props => {
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'white'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            paddingHorizontal: 50,
            paddingVertical: 50,
          }}>
          Coming Soon
        </Text>
      </View>
      <ScrollView scrollEventThrottle={16} style={{alignSelf: 'stretch'}}>
        <View>
          <Text
            style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
            Brands
          </Text>
        </View>
        <Thumbnails userInfo={props.userInfo} type={'brand'} navigation={props.navigation}/>
        <View>
          <Text
            style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
            Categories
          </Text>
        </View>
        <Thumbnails userInfo={props.userInfo} type={'categories'} navigation={props.navigation}/>
      </ScrollView>
    </View>
  );
};

export default HomePage;
