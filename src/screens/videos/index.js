import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Post from '../../components/Post';
import {useRoute} from '@react-navigation/native';

const Video = () => {
  const [posts, setPosts] = useState([]);

  const route = useRoute();

  useEffect(() => {
    setPosts(route.params.posts);
  }, [route.params.posts]);
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </View>
  );
};

export default Video;
