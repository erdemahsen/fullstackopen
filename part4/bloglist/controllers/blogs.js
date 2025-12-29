const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  }
  catch(error) {
    next(error)
  }
  // refactored it to use async await
  
  //Blog.find({}).then((blogs) => {
  //  response.json(blogs)
  //})
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blogObj = new Blog(request.body)
    const blog = await blogObj.save()
    response.status(201).json(blog)
  }
  catch(error) {
    next(error)
  }
  //blog.save().then((result) => {
  //  response.status(201).json(result)
  //})
})

blogsRouter.delete('/:id', async(request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  try {
    const blogToUpdate = await Blog.findById(request.params.id)
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  }
  catch(error) {
    next(error)
  }
})

module.exports = blogsRouter

