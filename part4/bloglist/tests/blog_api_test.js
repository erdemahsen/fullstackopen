const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const strict = require('assert/strict')
const { strictEqual, notEqual, equal, deepEqual } = require('assert')

const helper = require('./test_helper')
const { assert } = require('console')


const api = supertest(app)

let userObj

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  
  userObj = new User(helper.userToAdd)
  await userObj.save()

  for (const blogObj of helper.initialBlogs) {
    let blog = new Blog({...blogObj, user: userObj._id})
    await blog.save()
    userObj.blogs.push(blog._id)
  }
  await userObj.save()

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  //console.log(response.body)
  strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id, and not _id', async () => {
    const response = await api.get('/api/blogs')
    for(const blog of response.body)
    {
        //console.log(response.body[i].id)
        //console.log(response.body[i]._id)
        notEqual(blog.id, undefined)
        strictEqual(blog._id, undefined)
        // undefined means not initialized while null means initialized to null
    }
})

test('a blog post can be added correctly', async () => {
    const addedPost = await api
      .post('/api/blogs')
      .send(helper.blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    strictEqual(addedPost.body.title, helper.blogToAdd.title)
    strictEqual(addedPost.body.author, helper.blogToAdd.author)
    strictEqual(addedPost.body.url, helper.blogToAdd.url)
    strictEqual(addedPost.body.likes, helper.blogToAdd.likes)

    const response = await api.get('/api/blogs')

    const { id, ...blogWithoutId } = response.body[response.body.length-1]

    strictEqual(response.body.length, helper.initialBlogs.length + 1)
    deepEqual(blogWithoutId, helper.blogToAdd)
})

test('if likes property is missing it should be default to 0', async () => {
  const addedPost = await api
      .post('/api/blogs')
      .send(helper.blogToAddNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    strictEqual(addedPost.body.title, helper.blogToAddNoLikes.title)
    strictEqual(addedPost.body.author, helper.blogToAddNoLikes.author)
    strictEqual(addedPost.body.url, helper.blogToAddNoLikes.url)
    strictEqual(addedPost.body.likes, 0)

    const response = await api.get('/api/blogs')

    const { id, ...blogWithoutId } = response.body[response.body.length-1]

    strictEqual(response.body.length, helper.initialBlogs.length + 1)
    deepEqual(blogWithoutId, {likes: 0, ...helper.blogToAddNoLikes})
    
})

test('if title and url missing post should not be added', async () => {
    const failedPost = await api
      .post('/api/blogs')
      .send(helper.blogToFail)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    //console.log(response.body)
    //const { id, ...blogWithoutId } = response.body[response.body.length-1]

    strictEqual(response.body.length, helper.initialBlogs.length)
    //deepEqual(blogWithoutId, {likes: 0, ...helper.blogToAddNoLikes})
    
})

test('delete a blogPost', async () => {
    const beforeDelete = await api.get('/api/blogs')
    const blogToDelete = beforeDelete.body[0]
    //console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAfterDelete = await api.get('/api/blogs')
    strictEqual(blogsAfterDelete.body.length, helper.initialBlogs.length - 1)

    for (const blog of blogsAfterDelete.body){
      //console.log("comparing this to ",blog)
      //console.log("this", blogToDelete)
      notEqual(blog.id, blogToDelete.id)
    }
})

test('update a blogpost, like should be 1 more', async () => {
    const beforeUpdate = await api.get('/api/blogs')
    const blogToUpdate = beforeUpdate.body[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({...blogToUpdate, likes: blogToUpdate.likes+1})
      .expect(200)

    const blogsAfterUpdate = await api.get('/api/blogs')
    strictEqual(blogsAfterUpdate.body.length, helper.initialBlogs.length)

    for (const blog of blogsAfterUpdate.body){
      if(blogToUpdate.id === blog.id){
        deepEqual(blogToUpdate, {...blog, likes: blog.likes-1})
      }
    }
    // really important note here : 
    // {...blog, likes: blog.likes-1} and {likes: blog.likes-1, ...blog} are not the same
    // ordering matters 
})

after(async () => {
  await mongoose.connection.close()
})