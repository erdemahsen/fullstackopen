const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const strict = require('assert/strict')
const { strictEqual, notEqual, equal, deepEqual } = require('assert')

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

    const userToCreate = {
        username: "newUser",
        name: "new Guy",
        password: "password"
    }

    await api
      .post("/api/users")
      .send(userToCreate)
      .expect(201)

    const afterUsers = await api.get('/api/users')
    strictEqual(beforeUsers.body.length, afterUsers.body.length - 1)

    for (const user of afterUsers.body){
      if(user.username === userToCreate.username){
        strictEqual(user.name, userToCreate.name)
      }
    }

})

after(async () => {
  await mongoose.connection.close()
})