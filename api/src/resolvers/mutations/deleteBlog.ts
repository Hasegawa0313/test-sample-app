import { PrismaClient } from '@/prisma/generated/prisma-client-js'
import { MutationResolvers } from '@/src/generated/graphql'
const prisma = new PrismaClient()
export const deleteBlog: MutationResolvers['deleteBlog'] = async (
  _,
  { input }
) => {
  try {
    const { id } = input
    const blog = await prisma.blog.delete({
      where: {
        id: Number(id)
      }
    })
    return blog
  } catch (e) {
    throw e
  }
}
