import * as Types from './graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type CreateUserMutationVariables = Types.Exact<{
  input: Types.CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, email: string } | null };

export type DeleteBlogMutationVariables = Types.Exact<{
  input: Types.DeleteBlogInput;
}>;


export type DeleteBlogMutation = { __typename?: 'Mutation', deleteBlog?: { __typename?: 'Blog', id: string } | null };

export type BlogQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type BlogQuery = { __typename?: 'Query', blog?: { __typename?: 'Blog', id: string, title: string, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null, user?: { __typename?: 'User', id: string, username?: string | null } | null } | null };

export type BlogsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BlogsQuery = { __typename?: 'Query', blogs: Array<{ __typename?: 'Blog', id: string, title: string, userId?: number | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, username?: string | null } | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string }> | null } | null> };

export type UserQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, username?: string | null } | null };

export type UsersQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string } | null> };


export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
  }
}
    `;
export const DeleteBlogDocument = gql`
    mutation DeleteBlog($input: DeleteBlogInput!) {
  deleteBlog(input: $input) {
    id
  }
}
    `;
export const BlogDocument = gql`
    query Blog($id: ID!) {
  blog(id: $id) {
    id
    tags {
      id
      name
    }
    user {
      id
      username
    }
    title
    content
    createdAt
  }
}
    `;
export const BlogsDocument = gql`
    query Blogs {
  blogs {
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
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    email
    username
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
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    DeleteBlog(variables: DeleteBlogMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteBlogMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteBlogMutation>(DeleteBlogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteBlog', 'mutation');
    },
    Blog(variables: BlogQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogQuery>(BlogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Blog', 'query');
    },
    Blogs(variables?: BlogsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogsQuery>(BlogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Blogs', 'query');
    },
    User(variables: UserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>(UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'User', 'query');
    },
    Users(variables: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Users', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;