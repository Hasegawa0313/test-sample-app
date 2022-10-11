import { User } from '@/prisma/generated/prisma-client-js'

export type Context = {
  user?: User
}
