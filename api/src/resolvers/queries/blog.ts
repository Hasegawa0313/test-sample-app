import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { QueryResolvers } from '@/src/generated/graphql'

const prisma = new PrismaClient()
// ユーザー一覧返す
export const getBlog: QueryResolvers['blog'] = async (_, { id }) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(id)
      }
    })
    return blog
  } catch (error) {
    throw error
  }
}
