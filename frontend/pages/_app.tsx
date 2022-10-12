import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const cache = new InMemoryCache()

export const client = new ApolloClient({
  // defaultHttpLink: false,
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  cache
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ToastContainer theme="colored" hideProgressBar={true} />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
