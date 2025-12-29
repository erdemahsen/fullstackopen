const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const strict = require('assert/strict')
const { strictEqual } = require('assert')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
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
  strictEqual(response.body.length, initialBlogs.length)
})


after(async () => {
  await mongoose.connection.close()
})