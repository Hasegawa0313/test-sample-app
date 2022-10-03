import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { MutationResolvers } from '@/src/generated/graphql'
const prisma = new PrismaClient()
export const createUser: MutationResolvers['createUser'] = async (
  _,
  { input }
) => {
  const { email, username } = input
  const users = await prisma.user.create({
    data: {
      email,
      username
    }
  })
  return users
}
