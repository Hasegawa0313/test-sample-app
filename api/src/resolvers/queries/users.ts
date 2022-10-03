import { PrismaClient } from 'prisma/generated/prisma-client-js'
import { QueryResolvers } from 'src/generated/graphql'

const prisma = new PrismaClient()
const take = 20
// ユーザー一覧返す
export const getUsers: QueryResolvers['users'] = async (
  _: any,
  { page }: any
) => {
  console.log(page)
  const users = await prisma.user.findMany({
    skip: (page - 1) * take,
    take
  })
  return users
}
