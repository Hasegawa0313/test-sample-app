import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'
import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import { join } from 'path'
// import { Resolvers } from './generated/graphql'
import { getUsers } from '@/src/resolvers/queries/users'
import { getBlogs } from '@/src/resolvers/queries/blogs'
import { createUser } from '@/src/resolvers/mutations/createUser'
import { deleteBlog } from '@/src/resolvers/mutations/deleteBlog'
import { Resolvers } from './generated/graphql'
import { getUser } from '@/src/resolvers/queries/user'
import { PrismaClient, User } from '@/prisma/generated/prisma-client-js'
import { sign, verify } from 'jsonwebtoken'
import { compareSync } from 'bcrypt'
import { loginUser } from './resolvers/queries/loginUser'
import { getBlog } from './resolvers/queries/blog'

const prisma = new PrismaClient()
const app = express()
// パス指定より前に指定する。
const allowCrossDomain = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)
app.use(express.json()) // body-parser settings
app.use(express.urlencoded({ extended: true }))
//ログインAPI
app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email: email || '' } })

    if (!user) {
      return res.json({
        message: 'email not found'
      })
    }
    const result = compareSync(password, user.password)

    if (!result) {
      return res.json({
        message: 'password is not correct'
      })
    }
    //Tokenの発行　書き換え
    const payload = {
      id: user.id,
      name: user.username,
      email: user.email
    }
    const token = sign(payload, 'secret')
    return res.json({ token })
  } catch (error) {
    return next(error)
  }
})

// スキーマの定義
const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

// リゾルバーの定義
const resolvers: Resolvers = {
  Query: {
    user: getUser,
    users: getUsers,
    blogs: getBlogs,
    blog: getBlog,
    loginUser
  },
  Mutation: {
    createUser,
    deleteBlog
  }
}

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })
async function startApolloServer() {
  const httpServer = http.createServer(app)

  // サーバーの起動
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
    context: ({ req }) => {
      // Note: This example uses the `req` argument to access headers,
      // but the arguments received by `context` vary by integration.
      // This means they vary for Express, Koa, Lambda, etc.
      //
      // To find out the correct arguments for a specific integration,
      // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

      // Get the user token from the headers.
      const bearToken = req.headers.authorization || ''
      if (bearToken) {
        const bearer = bearToken.split(' ')
        const token = bearer[1]

        // Try to retrieve a user with the token
        const userPayload = verify(token, 'secret')

        // Add the user to the context
        return { user: userPayload as User }
      } else {
        return { user: {} }
      }
    }
  })
  await server.start()
  server.applyMiddleware({
    app,
    cors: { origin: ['http://localhost:3000'] },
    path: '/graphql'
  })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
