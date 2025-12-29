const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const strict = require('assert/strict')
const { strictEqual, notEqual, equal, deepEqual } = require('assert')

const helper = require('./test_helper')
const { assert } = require('console')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  // console.log(response.body)
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

after(async () => {
  await mongoose.connection.close()
})