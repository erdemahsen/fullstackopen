const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
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
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blogObj = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: decodedToken.id
    })

    const blog = await blogObj.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(blog)
  }
  catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async(request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }
    const blog = await Blog.findById(request.params.id)

    if(!blog) {
      return response.status(204)
    }

    // to string is necessary because id is an object **
    console.log(blog)
    console.log(user)
    if(blog.user.toString() === user.id) // do not compare blog and user's ids lol - 
    {
      await Blog.findByIdAndDelete(request.params.id)

      user.blogs.pull(request.params.id)

      await user.save()

      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'token invalid' })
    }
    //await Blog.findByIdAndDelete(request.params.id)
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

