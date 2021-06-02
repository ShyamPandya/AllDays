import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Thumbnail from '../Thumbnail';
import styles from './styles';
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const setUserPosts = async userInfo => {
      try {
        const userPosts = await API.graphql(
          graphqlOperation(listPosts, {
            filter: {userID: {eq: userInfo.id}},
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
    if (isFocused) {
      setUser(route.params.userInfo);
      setUserPosts(route.params.userInfo);
    } else {
      setUser(null);
      setPosts([]);
    }
  }, [isFocused, route.params.userInfo]);

  const goBackSafe = () => {
    // Traverse parent stack until we can go back
    let parent = navigation;
    while (
      parent.dangerouslyGetState()?.index === 0 &&
      parent.dangerouslyGetParent()
    ) {
      parent = parent.dangerouslyGetParent();
    }
    parent?.goBack();
  };

  const ProfileComponent = () => {
    return (
      <View>
        <View
          style={{paddingTop: 20, paddingLeft: 20, backgroundColor: 'white'}}>
          <TouchableWithoutFeedback onPress={goBackSafe}>
            <Ionicons name={'arrow-back'} size={30} color="grey" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.userComponent}>
            <Image
              style={styles.profilePicture}
              source={{uri: user.imageUri}}
            />
            <View style={styles.verticalLine} />
            <View>
              <Text style={styles.userHandle}>{user.username}</Text>
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
      </View>
    );
  };
  if (user === null) {
    return null;
  }
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
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProfilePage;
