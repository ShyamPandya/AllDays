import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {getUser, listPosts} from '../../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import Thumbnail from '../../components/Thumbnail';

const Thumbnails = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const setStateData = async () => {
      try {
        const userDb = await API.graphql(
          graphqlOperation(getUser, {id: props.userInfo.attributes.sub}),
        );
        let newPosts = [];
        let ids;
        let variable;

        //For brand interests
        if (props.type === 'brand') {
          ids = userDb.data.getUser.brandInterest;
          variable = 'brandTag';
        } else {
          ids = userDb.data.getUser.categoryInterest;
          variable = 'categoryTag';
        }
        for (const id of ids) {
          const post = await API.graphql(
            graphqlOperation(listPosts, {
              filter: {
                [variable]: {
                  eq: id,
                },
              },
            }),
          );
          if (
            post.data.listPosts.items &&
            post.data.listPosts.items.length > 0
          ) {
            newPosts = [...newPosts, post.data.listPosts.items];
          }
        }
        setPosts(newPosts);
      } catch (e) {
        console.error(e);
      }
    };
    setStateData();
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Thumbnail posts={item} navigation={props.navigation}/>}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      />
    </View>
  );
};

export default Thumbnails;
