
declare module '*/test.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Users: DocumentNode;

  export default defaultDocument;
}
    