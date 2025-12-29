const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Z Kuşağı Jargonu",
    author: "Ali",
    url: "https://www.alidindar.tr/z-kusagi-jargonu-2025/",
    likes: 3
  },
  {
    title: "Rusya Ukrayna ne olacak",
    author: "Andreas",
    url: "https://www.eurotopics.net/tr/350544/ukrayna-savasi-yeni-yil-ne-getirecek",
    likes: 11
  }
]

const nonExistingId = async () => {
  const blog = new Blog(
    {
        title: "Blog to be deleted",
        author: "Erdem",
        url: "https://www.blogposttobedeleted.com/",
        likes: 0
    })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
}