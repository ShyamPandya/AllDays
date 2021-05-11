/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
