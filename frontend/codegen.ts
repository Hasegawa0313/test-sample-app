import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: 'apollo/**/*.gql',
  generates: {
    './gql': {
      preset: 'client',
      plugins: []
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    },
    './gql/ssr.ts': {
      preset: 'import-types-preset',
      presetConfig: {
        typesPath: './graphql'
      },
      plugins: ['typescript-operations', 'typescript-graphql-request']
    }
  }
}

export default config
