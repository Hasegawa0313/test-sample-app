/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n  }\n}": types.CreateUserDocument,
    "mutation DeleteBlog($input: DeleteBlogInput!) {\n  deleteBlog(input: $input) {\n    id\n  }\n}": types.DeleteBlogDocument,
    "query Blog($id: ID!) {\n  blog(id: $id) {\n    id\n    tags {\n      id\n      name\n    }\n    user {\n      id\n      username\n    }\n    title\n    content\n    createdAt\n  }\n}": types.BlogDocument,
    "query Blogs {\n  blogs {\n    id\n    title\n    user {\n      id\n      username\n    }\n    userId\n    tags {\n      id\n      name\n    }\n    createdAt\n  }\n}": types.BlogsDocument,
    "query User($id: ID!) {\n  user(id: $id) {\n    id\n    email\n    username\n  }\n}": types.UserDocument,
    "query Users($page: Int!) {\n  users(page: $page) {\n    id\n    email\n  }\n}": types.UsersDocument,
};

export function graphql(source: "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n  }\n}"): (typeof documents)["mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n  }\n}"];
export function graphql(source: "mutation DeleteBlog($input: DeleteBlogInput!) {\n  deleteBlog(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation DeleteBlog($input: DeleteBlogInput!) {\n  deleteBlog(input: $input) {\n    id\n  }\n}"];
export function graphql(source: "query Blog($id: ID!) {\n  blog(id: $id) {\n    id\n    tags {\n      id\n      name\n    }\n    user {\n      id\n      username\n    }\n    title\n    content\n    createdAt\n  }\n}"): (typeof documents)["query Blog($id: ID!) {\n  blog(id: $id) {\n    id\n    tags {\n      id\n      name\n    }\n    user {\n      id\n      username\n    }\n    title\n    content\n    createdAt\n  }\n}"];
export function graphql(source: "query Blogs {\n  blogs {\n    id\n    title\n    user {\n      id\n      username\n    }\n    userId\n    tags {\n      id\n      name\n    }\n    createdAt\n  }\n}"): (typeof documents)["query Blogs {\n  blogs {\n    id\n    title\n    user {\n      id\n      username\n    }\n    userId\n    tags {\n      id\n      name\n    }\n    createdAt\n  }\n}"];
export function graphql(source: "query User($id: ID!) {\n  user(id: $id) {\n    id\n    email\n    username\n  }\n}"): (typeof documents)["query User($id: ID!) {\n  user(id: $id) {\n    id\n    email\n    username\n  }\n}"];
export function graphql(source: "query Users($page: Int!) {\n  users(page: $page) {\n    id\n    email\n  }\n}"): (typeof documents)["query Users($page: Int!) {\n  users(page: $page) {\n    id\n    email\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;