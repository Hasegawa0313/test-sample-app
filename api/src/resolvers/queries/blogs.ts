// import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { QueryResolvers } from '@/src/generated/graphql'

const prisma = new PrismaClient()
// ユーザー一覧返す
export const getBlogs: QueryResolvers['blogs'] = async () => {
  try {
    const blogs = await prisma.blog.findMany()
    return blogs
  } catch (error) {
    throw error
  }
}
