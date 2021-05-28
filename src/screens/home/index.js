import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';
import Thumbnail from '../../components/Thumbnail';

const HomePage = props => {
  const [brandPosts, setBrandPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    const setStateData = async () => {
      try {
        const allPosts = await API.graphql(graphqlOperation(listPosts));
        if (
          allPosts.data.listPosts.items &&
          allPosts.data.listPosts.items.length > 0
        ) {
          const postsList = allPosts.data.listPosts.items;
          let bps = {};
          let cps = {};
          let ops = {};

          postsList.forEach(post => {
            if (props.userInfo.brandInterest.includes(post.brandTag)) {
              if (post.brandTag in bps) {
                bps[post.brandTag].push(post);
              } else {
                bps[post.brandTag] = [post];
              }
            } else {
              const key =
                'brand_' +
                (post.brandTag !== null ? post.brandTag.toString() : 'null');
              if (key in ops) {
                ops[key].push(post);
              } else {
                ops[key] = [post];
              }
            }
            if (props.userInfo.categoryInterest.includes(post.categoryTag)) {
              if (post.categoryTag in cps) {
                cps[post.categoryTag].push(post);
              } else {
                cps[post.categoryTag] = [post];
              }
            } else {
              const key =
                'category_' +
                (post.categoryTag !== null
                  ? post.categoryTag.toString()
                  : 'null');
              if (key in ops) {
                ops[key].push(post);
              } else {
                ops[key] = [post];
              }
            }
          });
          setBrandPosts(Object.values(bps));
          setCategoryPosts(Object.values(cps));
          setOtherPosts(Object.values(ops));
        }
      } catch (e) {
        console.error(e);
      }
    };
    setStateData();
  }, []);

  const TempComponent = () => {
    return (
      <View>
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
        <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
          Brands
        </Text>
        <FlatList
          data={brandPosts}
          renderItem={({item}) => (
            <Thumbnail
              posts={item}
              height={130}
              width={130}
              showType={true}
              type={'brand'}
              leftMargin={30}
              topMargin={20}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
        <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
          Categories
        </Text>
        <FlatList
          data={categoryPosts}
          renderItem={({item}) => (
            <Thumbnail
              posts={item}
              height={130}
              width={130}
              showType={true}
              type={'category'}
              leftMargin={30}
              topMargin={20}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            paddingHorizontal: 20,
          }}>
          More Videos
        </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={otherPosts}
        renderItem={({item}) => (
          <Thumbnail
            posts={item}
            height={250}
            width={160}
            showType={false}
            leftMargin={30}
            topMargin={20}
          />
        )}
        ListHeaderComponent={TempComponent}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
};

export default HomePage;
