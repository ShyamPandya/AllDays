import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {getUser} from '../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';

const Thumbnails = props => {
  const getThumbnails = async () => {
    //const filter = props.type === 'brand' ? {brandTag : val} : {categoryTag : val};
    const brandFilterVal = {
      filter: {
        or: [],
      },
    };
    const categoryFilterVal = {
      filter: {
        or: [],
      },
    };
    try {
      //const resp = await API.graphql(graphqlOperation(listPosts, {filter: }));
      //setPosts(resp.data.listPosts.items);
      const userDb = await API.graphql(
        graphqlOperation(getUser, {id: props.userInfo.attributes.sub}),
      );

      //For brand interests
      userDb.data.getUser.brandInterest.forEach(brandId => {
        brandFilterVal.filter.or.push({
          brandTag: {
            eq: brandId,
          },
        });
      });

      //For category interests
      userDb.data.getUser.categoryInterest.forEach(categoryId => {
        categoryFilterVal.filter.or.push({
          categoryTag: {
            eq: categoryId,
          },
        });
      });


    } catch (e) {
      console.error(e);
    }
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#dddddd',
        }}>
        <View style={{flex: 2}}>
          <Image
            source=""
            style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
          />
        </View>
        <View>
          <Text> Temporary text</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView horizontal={true}>{getThumbnails()}</ScrollView>
    </View>
  );
};

export default Thumbnails;
