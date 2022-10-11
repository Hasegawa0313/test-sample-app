import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

export const client = new ApolloClient({
  // defaultHttpLink: false,
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  cache
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
