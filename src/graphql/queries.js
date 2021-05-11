/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      imageUri
      posts {
        items {
          id
          videoUri
          description
          brandTag
          categoryTag
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      brandInterest
      categoryInterest
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        imageUri
        posts {
          nextToken
        }
        brandInterest
        categoryInterest
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      videoUri
      description
      brandTag
      categoryTag
      userID
      user {
        id
        username
        email
        imageUri
        posts {
          nextToken
        }
        brandInterest
        categoryInterest
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        videoUri
        description
        brandTag
        categoryTag
        userID
        user {
          id
          username
          email
          imageUri
          brandInterest
          categoryInterest
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
