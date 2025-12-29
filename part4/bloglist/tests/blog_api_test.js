const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const strict = require('assert/strict')
const { strictEqual, notEqual } = require('assert')

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
    }
})

after(async () => {
  await mongoose.connection.close()
})