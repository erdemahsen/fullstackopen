const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const strict = require('assert/strict')
const { strictEqual, notEqual, equal, deepEqual } = require('assert')

const helper = require('./test_user_helper')

const { assert } = require('console')

const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('create a user', async () => {
    const beforeUsers = await api.get('/api/users')

    await api
      .post("/api/users")
      .send(helper.userToAdd)
      .expect(201)

    const afterUsers = await api.get('/api/users')
    strictEqual(beforeUsers.body.length, afterUsers.body.length - 1)

    for (const user of afterUsers.body){
      if(user.username === helper.userToAdd.username){
        strictEqual(user.name, helper.userToAdd.name)
      }
    }
})

test('trying to create a user with short username', async () => {
    await api
      .post("/api/users")
      .send(helper.userWithShortUsername)
      .expect(400)
})

test('trying to create a user with short password', async () => {
    await api
      .post("/api/users")
      .send(helper.userWithShortPassword)
      .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})