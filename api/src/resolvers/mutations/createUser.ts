import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { MutationResolvers } from '@/src/generated/graphql'
import { hashSync } from 'bcrypt'
const saltRounds = 10

const prisma = new PrismaClient()
export const createUser: MutationResolvers['createUser'] = async (
  _,
  { input }
) => {
  const { email, password, username } = input
  const hassedPassword = hashSync(password, saltRounds)
  const user = await prisma.user.create({
    data: {
      email,
      password: hassedPassword,
      username
    }
  })
  return user
}
