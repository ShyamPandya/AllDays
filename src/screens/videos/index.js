import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Post from '../../components/Post';
import {listPosts} from '../../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import { useNavigation, useRoute } from "@react-navigation/native";

const Video = () => {
  const [posts, setPosts] = useState([]);

  const route = useRoute();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await API.graphql(graphqlOperation(listPosts));
        setPosts(resp.data.listPosts.items);
      } catch (e) {
        console.error(e);
      }
    };
    setPosts(route.params.posts);
    //fetchPosts();
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
