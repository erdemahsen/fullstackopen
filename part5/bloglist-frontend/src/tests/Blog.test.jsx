import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

let component

const blog = {
  title: 'Find this text',
  author: 'Testerr',
  url: 'hello.com',
  likes: 0,
  user: {
    username: 'testerguy@gmail.com',
    name: 'Tester Guy',
  }
}

const user = {
  username: 'testerguy@gmail.com',
  name: 'Tester Guy',
}

const updateBlogMock = vi.fn()
const deleteBlogMock = vi.fn()

beforeEach(() => {
  component = render(<Blog key={blog.id} blog={blog} handleUpdateBlog={updateBlogMock} handleDeleteBlog={deleteBlogMock} currentUser={user}/>)
})

test('renders content correctly', () => {
  //console.log(component.container)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})

test('view button is clicked', async () => {
  //console.log(component.container)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)

  const userGuy = userEvent.setup()
  const button = screen.getByText('view')
  await userGuy.click(button)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
})

