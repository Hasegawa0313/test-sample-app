import { PrismaClient } from 'prisma/generated/prisma-client-js'
import { QueryResolvers } from 'src/generated/graphql'

const prisma = new PrismaClient()
// ユーザー一覧返す
export const loginUser: QueryResolvers['loginUser'] = async (
  _parent,
  _value,
  context
) => {
  const user = prisma.user.findUnique({
    where: {
      id: context.user?.id
    }
  })

  return user
}
