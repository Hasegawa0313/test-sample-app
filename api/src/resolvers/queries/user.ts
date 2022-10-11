import { PrismaClient } from 'prisma/generated/prisma-client-js'
import { QueryResolvers } from 'src/generated/graphql'

const prisma = new PrismaClient()
// ユーザー一覧返す
export const getUser: QueryResolvers['user'] = async (_, { id }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  })
  return user
}
