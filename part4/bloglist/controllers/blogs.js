const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  //console.log(blogs)
  response.json(blogs)
  // refactored it to use async await
  
  //Blog.find({}).then((blogs) => {
  //  response.json(blogs)
  //})
})

blogsRouter.post('/', async (request, response) => {
  const blogObj = new Blog(request.body)

  const blog = await blogObj.save()
  response.status(201).json(blog)

  //blog.save().then((result) => {
  //  response.status(201).json(result)
  //})
})

module.exports = blogsRouter

