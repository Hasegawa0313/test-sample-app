import { useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables
} from '@/gql/graphql'

const cookie = new Cookie()

const Auth: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log(res.status)
      console.log(res.data)
      if (res.status === 200 && res.data.token) {
        console.log(res)
        const options = { path: '/' }
        cookie.set('access_token', res.data.token, options)
        router.push('/')
      } else {
        setError('Login Error')
      }
    } catch {
      setError('Login Error')
    }
  }

  const [createUserMutation] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument)
  const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      login()
    } else {
      try {
        const result = await createUserMutation({
          variables: { input: { email, password, username } }
        })
        if (result.data?.createUser?.id) {
          login()
        } else {
          setError('Registration Error')
        }
      } catch {
        setError('Registration Error')
      }
    }
  }

  return (
    <>
      <p className="text-3xl text-center">{isLogin ? 'Login' : 'Sign up'}</p>
      <form onSubmit={authUser} className="mt-8 space-y-3">
        <div>
          <input
            type="email"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        {!isLogin ? (
          <div>
            <input
              type="text"
              required
              className="px-3 py-2 border border-gray-300"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
        ) : (
          <></>
        )}

        <div>
          <input
            type="password"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <p
          data-testid="mode-change"
          onClick={() => {
            setIsLogin(!isLogin)
            setError('')
          }}
          className="cursor-pointer flex items-center justify-center flex-col font-medium hover:text-indigo-500 "
        >
          change mode ?
        </p>

        <div className="flex items-center justify-center flex-col">
          <button
            disabled={!email || !password}
            type="submit"
            className="disabled:opacity-40 py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            {isLogin ? 'Login with JWT' : 'Create new user'}
          </button>
        </div>
      </form>
      {error && (
        <p test-data-id="error" className="mt-5 text-red-600">
          {error}
        </p>
      )}
    </>
  )
}
export default Auth
