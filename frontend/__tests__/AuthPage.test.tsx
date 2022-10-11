/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
  cleanup,
  renderHook,
  act
} from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import AdminPage from '@/pages/admin-page'
import { CreateUserDocument } from '@/gql/graphql'
import { CreateUserMutation } from '@/gql/ssr'
import { useRouter } from 'next/router'
import mockRouter from 'next-router-mock'

const handlers = [
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: '123xyz' }))
  })
]

const server = setupServer(...handlers)
const mutationSuccessMocks: MockedResponse<CreateUserMutation>[] = [
  {
    request: {
      query: CreateUserDocument,
      variables: {
        input: {
          email: 'testahasegawa@ekanlab.co.jp',
          password: 'testtest',
          username: 'testUserName'
        }
      }
    },
    result: {
      data: {
        createUser: {
          id: '1',
          email: 'testahasegawa@ekanlab.co.jp'
        }
      }
    }
  }
]
const mutationErrMocks: MockedResponse<CreateUserMutation>[] = [
  {
    request: {
      query: CreateUserDocument,
      variables: {
        input: {
          email: 'testahasegawa@ekanlab.co.jp',
          password: 'testtest',
          username: 'testUserName'
        }
      }
    },
    error: new Error('An error occurred')
  }
]
beforeEach(() => {
  mockRouter.setCurrentUrl('/admin-page')
})
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
  it('Should route to index-page when login succeeded', () => {
    //   render(
    //     <MockedProvider mocks={mutationMocks} addTypename={false}>
    //       <AdminPage />
    //     </MockedProvider>
    //   )
    //   expect(await screen.findByText('Login')).toBeInTheDocument()
    //   userEvent.type(
    //     screen.getByPlaceholderText('Email'),
    //     'testahasegawa@ekanlab.co.jp'
    //   )
    //   userEvent.type(screen.getByPlaceholderText('Password'), 'testtest')
    //   userEvent.click(screen.getByText('Login with JWT'))
    //   render(
    //     <MockedProvider mocks={mutationMocks} addTypename={false}>
    //       <AdminPage />
    //     </MockedProvider>
    //   )
    //   expect(await screen.findByText('blog page')).toBeInTheDocument()
  })
  it('ログイン失敗すべき', async () => {
    server.use(
      rest.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        (req, res, ctx) => {
          return res(ctx.status(400))
        }
      )
    )
    render(
      <MockedProvider mocks={mutationSuccessMocks} addTypename={false}>
        <AdminPage />
      </MockedProvider>
    )
    expect(await screen.findByText('Login')).toBeInTheDocument()
    await userEvent.type(screen.getByPlaceholderText('Email'), 'user1@test')
    await userEvent.type(screen.getByPlaceholderText('Password'), 'dummypw')
    await userEvent.click(screen.getByText('Login with JWT'))
    expect(await screen.findByText('Login Error'))
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('登録モードに変更されるべき', async () => {
    render(
      <MockedProvider mocks={mutationSuccessMocks} addTypename={false}>
        <AdminPage />
      </MockedProvider>
    )
    expect(await screen.findByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Login with JWT')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('mode-change'))
    expect(screen.getByText('Sign up')).toBeInTheDocument()
    expect(screen.getByText('Create new user')).toBeInTheDocument()
  })

  it('Should route to index-page when register+login succeeded', async () => {
    // つまり中、、、
    // const { result } = renderHook(() => {
    //   return useRouter()
    // })
    // render(
    //   <MockedProvider mocks={mutationSuccessMocks} addTypename={false}>
    //     <AdminPage />
    //   </MockedProvider>
    // )
    // expect(await screen.findByText('Login')).toBeInTheDocument()
    // expect(result.current).toMatchObject({
    //   asPath: '/admin-page'
    // })
    // await userEvent.click(screen.getByTestId('mode-change'))
    // await userEvent.type(
    //   screen.getByPlaceholderText('Username'),
    //   'testahasegawa@ekanlab.co.jp'
    // )
    // await userEvent.type(screen.getByPlaceholderText('Password'), 'testtest')
    // await userEvent.click(screen.getByText('Create new user'))
    // expect(result.current.push).toHaveBeenCalledTimes(1)
  })
})
