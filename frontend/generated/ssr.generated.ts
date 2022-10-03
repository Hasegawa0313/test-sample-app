import * as Types from './graphql-operation';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type UsersQueryVariables = Types.Exact<{
  page: Types.Scalars['Int'];
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string }> };


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

export function UsersQuerySdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Users(variables: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Users', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof UsersQuerySdk>;