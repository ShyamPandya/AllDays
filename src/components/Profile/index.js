import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import Thumbnail from '../Thumbnail';
import styles from './styles';
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

const ProfilePage = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const setUserPosts = async () => {
      try {
        const userPosts = await API.graphql(
          graphqlOperation(listPosts, {
            filter: {userID: {eq: props.userInfo.id}},
          }),
        );
        if (
          userPosts.data.listPosts.items &&
          userPosts.data.listPosts.items.length > 0
        ) {
          let tempPosts = [];
          userPosts.data.listPosts.items.forEach(post => {
            tempPosts.push([post]);
          });
          setPosts(tempPosts);
        }
      } catch (e) {
        console.error(e);
      }
    };
    setUserPosts();
  }, []);

  const ProfileComponent = () => {
    return (
      <View style={styles.userContainer}>
        <View style={styles.userComponent}>
          <Image
            style={styles.profilePicture}
            source={{uri: props.userInfo.imageUri}}
          />
          <View style={styles.verticalLine} />
          <View>
            <Text style={styles.userHandle}>{props.userInfo.username}</Text>
            <Text style={styles.userAbout}>About section of user</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.statsComponent}>
          <View>
            <Text style={styles.heading}> Followers </Text>
            <Text style={styles.values}> 125 </Text>
          </View>
          <View style={styles.verticalLine} />
          <View>
            <Text style={styles.heading}> Following </Text>
            <Text style={styles.values}> 125 </Text>
          </View>
          <View style={styles.verticalLine} />
          <View>
            <Text style={styles.heading}> Posts </Text>
            <Text style={styles.values}> {posts.length} </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainComponent}>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <Thumbnail
            posts={item}
            height={(Dimensions.get('window').width - 16) / 3}
            width={(Dimensions.get('window').width - 16) / 3}
            showType={false}
            leftMargin={4}
            topMargin={4}
          />
        )}
        ListHeaderComponent={ProfileComponent}
        horizontal={false}
        numColumns={3}
      />
    </View>
  );
};

export default ProfilePage;
