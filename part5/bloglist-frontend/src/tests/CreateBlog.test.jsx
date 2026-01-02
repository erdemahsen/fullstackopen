import { render, screen } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import CreateBlog from '../components/CreateBlog'

let component

const blog = {
  title: 'This title will be typed.',
  author: 'Tester Guy2',
  url: 'hellotyping.com',
}


const addBlogMock = vi.fn() // I will use this guy

component = render(<CreateBlog handleAddBlog={addBlogMock}/>)

test('Creating a blogpost', async () => {

  const userGuy = userEvent.setup()

  const inputTitle = screen.getByLabelText('title')
  const inputAuthor = screen.getByLabelText('author')
  const inputUrl = screen.getByLabelText('url')

  const submitButton = screen.getByText('addBlog')

  await userGuy.type(inputTitle, blog.title)
  await userGuy.type(inputAuthor, blog.author)
  await userGuy.type(inputUrl, blog.url)

  await userGuy.click(submitButton)

  expect(addBlogMock.mock.calls).toHaveLength(1)
  expect(addBlogMock.mock.calls[0][0].title).toBe(blog.title)
  expect(addBlogMock.mock.calls[0][0].author).toBe(blog.author)
  expect(addBlogMock.mock.calls[0][0].url).toBe(blog.url)
})


