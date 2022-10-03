import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type BlogsQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type BlogsQuery = { __typename?: 'Query', blogs: Array<{ __typename?: 'Blog', id: string, title: string, userId?: number | null, createdAt?: string | null, user?: { __typename?: 'User', id: string, username?: string | null } | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | null> };

export type UsersQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string } | null> };


export const BlogsDocument = gql`
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

/**
 * __useBlogsQuery__
 *
 * To run a query within a React component, call `useBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useBlogsQuery(baseOptions: Apollo.QueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, options);
      }
export function useBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, options);
        }
export type BlogsQueryHookResult = ReturnType<typeof useBlogsQuery>;
export type BlogsLazyQueryHookResult = ReturnType<typeof useBlogsLazyQuery>;
export type BlogsQueryResult = Apollo.QueryResult<BlogsQuery, BlogsQueryVariables>;
export const UsersDocument = gql`
    query Users($page: Int!) {
  users(page: $page) {
    id
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;