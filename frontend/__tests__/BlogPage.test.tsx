/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup, act } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { DeleteBlogDocument, DeleteBlogMutation } from '@/gql/graphql'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { ToastContainer } from 'react-toastify'
import BlogPage from '../pages'

jest.mock('next/router', () => {
  const push = jest.fn()
  return {
    useRouter: jest.fn(() => ({
      push
    }))
  }
})

jest.mock('universal-cookie', () => {
  const mCookie = {
    get: jest.fn()
  }
  return jest.fn(() => mCookie)
})

const handlers = [
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: '123xyz' }))
  })
]

const server = setupServer(...handlers)

const mutationSuccessMocks: MockedResponse<DeleteBlogMutation>[] = [
  {
    request: {
      query: DeleteBlogDocument,
      variables: {
        input: {
          id: '1'
        }
      }
    },
    result: {
      data: {
        deleteBlog: {
          id: '1'
        }
      }
    }
  }
]
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})

describe('Adminページ', () => {
  it('ブログの削除', async () => {
    const cookies = new Cookies()
    ;(cookies.get as jest.Mocked<any>).mockReturnValueOnce({
      value: '12492525'
    })
    render(
      <MockedProvider mocks={mutationSuccessMocks} addTypename={false}>
        <div>
          <ToastContainer theme="colored" hideProgressBar={true} />
          <BlogPage
            posts={{
              blogs: [
                {
                  id: '1',
                  title: 'titletitle1',
                  tags: [
                    { id: '1', name: 'tag1' },
                    { id: '2', name: 'tag2' }
                  ],
                  userId: 1,
                  user: {
                    id: '1',
                    username: 'akane'
                  },
                  createdAt: '2022-10-11'
                },
                {
                  id: '2',
                  title: 'titletitle2',
                  tags: [
                    { id: '1', name: 'tag1' },
                    { id: '2', name: 'tag2' }
                  ],
                  userId: 1,
                  user: {
                    id: '1',
                    username: 'akane'
                  },
                  createdAt: '2022-10-11'
                }
              ]
            }}
          />
        </div>
      </MockedProvider>
    )
    expect(await screen.findByText('titletitle1')).toBeInTheDocument()
    expect(await screen.findByText('titletitle2')).toBeInTheDocument()

    await userEvent.click(await screen.getByTestId(`btn-1`))
    expect(await screen.queryByText('testtest1')).toBeNull()
    expect(await screen.findByText('削除しました。')).toBeInTheDocument()
  })
})
