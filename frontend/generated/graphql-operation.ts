import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Blog = {
  __typename?: 'Blog';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
};

export type DeleteBlogInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  deleteBlog?: Maybe<Blog>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBlogArgs = {
  input: DeleteBlogInput;
};

export type Query = {
  __typename?: 'Query';
  blogs: Array<Maybe<Blog>>;
  users: Array<Maybe<User>>;
};


export type QueryBlogsArgs = {
  page: Scalars['Int'];
};


export type QueryUsersArgs = {
  page: Scalars['Int'];
};

export type Tag = {
  __typename?: 'Tag';
  blog?: Maybe<Blog>;
  blogId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  blogs?: Maybe<Array<Blog>>;
  email: Scalars['String'];
  id: Scalars['ID'];
  tags?: Maybe<Tag>;
  username?: Maybe<Scalars['String']>;
};


export const Blogs = gql`
    query Blogs($page: Int!) {
  blogs(page: $page) {
    id
    title
    user {
      id
      username
    }
    userId
    tags {
      id
      name
    }
    createdAt
  }
}
    `;
export const Users = gql`
    query Users($page: Int!) {
  users(page: $page) {
    id
    email
  }
}
    `;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    