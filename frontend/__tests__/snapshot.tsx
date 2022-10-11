import { render } from '@testing-library/react'
import BlogPage from '@/pages/index'
import { MockedProvider } from '@apollo/client/testing'
import AdminPage from '@/pages/admin-page'

const mocks: any = []
it('renders homepage unchanged', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AdminPage />
    </MockedProvider>
  )
  expect(container).toMatchSnapshot()
})
