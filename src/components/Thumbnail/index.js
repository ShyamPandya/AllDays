import React, {useState, useEffect} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {Storage} from 'aws-amplify';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {brandData, categoryData} from '../../assets/constants';

const Thumbnail = props => {
  const [imgUri, setImgUri] = useState('');
  const navigation = useNavigation();

  const playVideos = () => {
    navigation.navigate('VideoPage', {
      screen: 'VideoPage',
      posts: props.posts,
    });
  };

  useEffect(() => {
    const setImgUriData = async () => {
      setImgUri(
        await Storage.get(
          props.posts[0].videoUri.replace('.mp4', '_thumbnail.jpg'),
        ),
      );
    };
    if (props.posts && props.posts.length > 0) {
      setImgUriData();
    }
  });

  return imgUri === '' ? null : (
    <View
      style={{
        marginLeft: props.leftMargin,
        marginTop: props.topMargin,
      }}>
      <View style={{flex: 2, borderWidth: 0.5, borderColor: 'black'}}>
        <ImageBackground
          source={{uri: imgUri}}
          style={{height: props.height, width: props.width}}
          resizeMode="cover">
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: props.height / 2}}
            onPress={playVideos}>
            <AntDesign name={'playcircleo'} size={40} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      {props.showType ? (
        <View>
          {props.type === 'brand' ? (
            <Text style={{color: 'black', fontFamily: ''}}>
              {brandData[props.posts[0].brandTag].item}
            </Text>
          ) : (
            <Text style={{color: 'black', fontFamily: ''}}>
              {categoryData[props.posts[0].categoryTag].item}
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default Thumbnail;
