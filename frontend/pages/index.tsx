import { useState, useEffect } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { POST } from '../types/types'
import { useMutation } from '@apollo/client'
import { GraphQLClient } from 'graphql-request'
import {
  DeleteBlogDocument,
  DeleteBlogMutation,
  DeleteBlogMutationVariables
} from '@/gql/graphql'
import Cookie from 'universal-cookie'
import { getSdk } from '@/gql/ssr'
import { toast } from 'react-toastify'
const cookie = new Cookie()

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogPage = ({ posts }: Props) => {
  // ブログのポスト削除
  const [deleteBlogMutation] = useMutation<
    DeleteBlogMutation,
    DeleteBlogMutationVariables
  >(DeleteBlogDocument)

  const [hasToken, setHasToken] = useState(false)
  const logout = () => {
    cookie.remove('access_token')
    setHasToken(false)
  }

  const deletePost = async (id: number) => {
    try {
      const result = await deleteBlogMutation({
        context: {
          headers: {
            Authorization: `Bearer ${cookie.get('access_token')}`
          }
        },
        variables: {
          input: {
            id: id.toFixed()
          }
        }
      })

      if (result.data?.deleteBlog?.id) {
        if (posts?.blogs) {
          posts.blogs = posts?.blogs.filter(
            (value) => value?.id !== result.data?.deleteBlog?.id
          )
        }

        toast('削除しました。', {
          type: 'success'
        })
      } else {
        toast('エラーが発生しました。', {
          type: 'error'
        })
      }
    } catch (error) {
      console.log(error)
      toast('エラーが発生しました。', {
        type: 'error'
      })
    }
  }
  useEffect(() => {
    if (cookie.get('access_token')) {
      setHasToken(true)
    }
  }, [])
  return (
    <Layout title="Blog">
      <p data-test-id="page-name" className="text-4xl mb-10">
        blog page
      </p>
      <ul>
        {posts &&
          posts.blogs.map((post) => (
            <li key={post?.id}>
              <Link href={`/posts/${post?.id}`}>
                <a className="cursor-pointer border-b border-gray-500 hover:bg-gray-300">
                  {post?.title}
                </a>
              </Link>
              {hasToken && (
                <svg
                  onClick={() => deletePost(Number(post?.id))}
                  data-testid={`btn-${post?.id}`}
                  className="w-6 h-6 ml-10 float-right cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </li>
          ))}
      </ul>
      {hasToken && (
        <svg
          data-testid="logout-icon"
          onClick={logout}
          className="w-6 h-6 mt-10 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      )}
    </Layout>
  )
}
export default BlogPage

export const getStaticProps = async () => {
  // const posts = await getAllPostsData()
  try {
    const BASE_ENDPOINT = new GraphQLClient(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    )
    const sdk = getSdk(BASE_ENDPOINT)

    const posts = await sdk.Blogs()

    return {
      props: { posts },
      revalidate: 3
    }
  } catch (error) {
    return {
      notFound: true,
      props: { posts: null },
      revalidate: 3
    }
  }
}
