// import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { QueryResolvers } from '@/src/generated/graphql'

const prisma = new PrismaClient()
const take = 20
// ユーザー一覧返す
export const getBlogs: QueryResolvers['blogs'] = async (_, { page }) => {
  try {
    const blogs = await prisma.blog.findMany({
      skip: (page - 1) * take,
      take
    })
    return blogs
  } catch (error) {
    throw error
  }
}
