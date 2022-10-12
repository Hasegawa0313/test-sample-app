/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import AdminPage from '@/pages/admin-page'
import { CreateUserDocument, CreateUserMutation } from '@/gql/graphql'
import { useRouter } from 'next/router'

jest.mock('next/router', () => {
  const push = jest.fn()
  return {
    useRouter: jest.fn(() => ({
      push
    }))
  }
})

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
  it('Should route to index-page when login succeeded', async () => {
    render(
      <MockedProvider mocks={mutationSuccessMocks} addTypename={false}>
        <AdminPage />
      </MockedProvider>
    )
    expect(await screen.findByText('Login')).toBeInTheDocument()
    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'testahasegawa@ekanlab.co.jp'
    )
    await userEvent.type(
      await screen.getByPlaceholderText('Password'),
      'testtest'
    )
    await userEvent.click(await screen.getByText('Login with JWT'))
    expect(useRouter().push).toHaveBeenCalledWith('/')
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
    render(
      <MockedProvider mocks={mutationSuccessMocks} addTypename={false}>
        <AdminPage />
      </MockedProvider>
    )
    expect(await screen.findByText('Login')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('mode-change'))
    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'testahasegawa@ekanlab.co.jp'
    )
    await userEvent.type(screen.getByPlaceholderText('Username'), 'test')
    await userEvent.type(screen.getByPlaceholderText('Password'), 'testtest')
    await userEvent.click(screen.getByText('Create new user'))
    expect(useRouter().push).toHaveBeenCalledWith('/')
  })

  it('Should not route to index-page when registration is failed', async () => {
    render(
      <MockedProvider mocks={mutationErrMocks} addTypename={false}>
        <AdminPage />
      </MockedProvider>
    )
    expect(await screen.findByText('Login')).toBeInTheDocument()
    await userEvent.click(screen.getByTestId('mode-change'))
    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@email.com')
    await userEvent.type(screen.getByPlaceholderText('Username'), 'user1')
    await userEvent.type(screen.getByPlaceholderText('Password'), 'dummypw')
    await userEvent.click(screen.getByText('Create new user'))
    expect(await screen.findByText('Registration Error'))
    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })
})
