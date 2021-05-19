import React, {useState, useEffect} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {Storage} from 'aws-amplify';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Thumbnail = props => {
  //const navigation = useNavigation();
  const [imgUri, setImgUri] = useState('');

  const playVideos = () => {
    props.navigation.navigate('VideoPage', {
      someParam: 'param',
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
    setImgUriData();
  });

  return imgUri === '' ? null : (
    <View
      style={{
        marginLeft: 20,
        borderWidth: 0.5,
        borderColor: 'black',
      }}>
      <View style={{flex: 2}}>
        <ImageBackground
          source={{uri: imgUri}}
          style={{height: 130, width: 130}}
          resizeMode="cover">
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 55}}
            onPress={playVideos}>
            <AntDesign name={'playcircleo'} size={40} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View>
        <Text style={{color: 'black'}}> {props.posts[0].brandTag} </Text>
      </View>
    </View>
  );
};

export default Thumbnail;
