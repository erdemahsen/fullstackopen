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

module.exports = blogsRouter

