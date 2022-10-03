import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server'
import { join } from 'path'
// import { Resolvers } from './generated/graphql'
import { getUsers } from '@/src/resolvers/queries/users'
import { getBlogs } from './resolvers/queries/blogs'
import { createUser } from '@/src/resolvers/mutations/createUser'
import { deleteBlog } from '@/src/resolvers/mutations/deleteBlog'
import { Resolvers } from './generated/graphql'
// import { Resolvers } from './generated/graphql'

// スキーマの定義
const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

// リゾルバーの定義
const resolvers: Resolvers = {
  Query: {
    users: getUsers,
    blogs: getBlogs
  },
  Mutation: {
    createUser,
    deleteBlog
  }
}

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

// サーバーの起動
const server = new ApolloServer({ schema: schemaWithResolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
