import * as Types from './graphql-operation';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type BlogsQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
}>;


export type BlogsQuery = { __typename?: 'Query', blogs: Array<{ __typename?: 'Blog', id: string, title: string, userId?: number | null, createdAt?: string | null, user?: { __typename?: 'User', id: string, username?: string | null } | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | null> };

export type UsersQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
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
export const UsersDocument = gql`
    query Users($page: Int!) {
  users(page: $page) {
    id
    email
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Blogs(variables: BlogsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogsQuery>(BlogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Blogs', 'query');
    },
    Users(variables: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Users', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;