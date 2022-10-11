import Link from 'next/link'
import Layout from '../../components/Layout'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '@/gql/ssr'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostDetail: React.FC<Props> = ({ blog }) => {
  return (
    <Layout title={blog?.title || ''}>
      <div>
        {blog?.tags &&
          blog?.tags.map((tag, i) => (
            <span
              className={`px-2 py-2 m-1 text-white rounded ${
                i === 0
                  ? 'bg-blue-500'
                  : i === 1
                  ? 'bg-gray-500'
                  : i === 2
                  ? 'bg-green-500'
                  : i === 3
                  ? 'bg-yellow-500'
                  : i === 4
                  ? 'bg-indigo-500'
                  : 'bg-gray-400'
              }`}
              key={tag.id}
            >
              {tag.name}
            </span>
          ))}
      </div>
      <p className="m-10 text-xl font-bold">{blog?.title || ''}</p>
      <p className="mx-10 mb-12">{blog?.content || ''}</p>
      <p>{blog?.createdAt}</p>
      <p className="mt-3">
        {'by '} {blog?.user?.username}
      </p>
      <Link href="/">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <a data-testid="back-blog">Back to blog-page</a>
        </div>
      </Link>
    </Layout>
  )
}
export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = await getAllPostIds()
  const BASE_ENDPOINT = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  )
  const sdk = getSdk(BASE_ENDPOINT)

  const posts = await sdk.Blogs()
  const paths = posts.blogs.map((value) => ({
    params: {
      id: value?.id || ''
    }
  }))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  //const { post: post } = await getPostData(ctx.params.id as string)
  // const post = await getPostData(ctx.params.id as string)
  const BASE_ENDPOINT = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  )
  const sdk = getSdk(BASE_ENDPOINT)
  const id =
    ctx.params?.id && !Array.isArray(ctx.params.id) ? ctx.params.id : ''

  const post = await sdk.Blog({ id })
  return {
    props: {
      ...post
    },
    revalidate: 3
  }
}
