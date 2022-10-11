import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'

import {
  BlogsDocument,
  UsersDocument,
  UserDocument,
  BlogsQuery,
  BlogsQueryVariables,
  UserQuery,
  UserQueryVariables,
  UsersQuery,
  UsersQueryVariables
} from '@/gql/graphql'

export const useUser = (
  variables: UserQueryVariables
  // option?: {
  //   headers: {
  //     Authorization?: string
  //   }
  // }
) => {
  const [user, setUser] = useState<UserQuery['user']>()

  const [loadUser, { data, refetch, loading }] = useLazyQuery(UserDocument, {
    variables,
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => {
    if (data) {
      setUser(data.user)
    }
  }, [data])
  return { data, refetch, loading, user, loadUser }
}

export const useUsers = (
  variables: UsersQueryVariables
  // option?: {
  //   headers: {
  //     Authorization?: string
  //   }
  // }
) => {
  const [users, setUsers] = useState<UsersQuery['users']>()

  const [loadUsers, { data, refetch, loading }] = useLazyQuery(UsersDocument, {
    variables,
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => {
    if (data) {
      setUsers(data.users)
    }
  }, [data])
  return { data, refetch, loading, users, loadUsers }
}

export const useBlogs = (
  variables: BlogsQueryVariables
  // option?: {
  //   headers: {
  //     Authorization?: string
  //   }
  // }
) => {
  const [blogs, setBlogs] = useState<BlogsQuery['blogs']>()

  const [loadBlogs, { data, refetch, loading }] = useLazyQuery(BlogsDocument, {
    variables,
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => {
    if (data) {
      setBlogs(data.blogs)
    }
  }, [data])
  return { data, refetch, loading, blogs, loadBlogs }
}
