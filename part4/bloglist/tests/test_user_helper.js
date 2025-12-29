const User = require('../models/blog')

const userToAdd = {
    username: "newUser",
    name: "new Guy",
    password: "password"
}

const userWithShortUsername = {
    username: "ne",
    name: "new Guy",
    password: "password"
}

const userWithShortPassword = {
    username: "newguy",
    name: "new Guy",
    password: "pa"
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  userToAdd, userWithShortUsername, userWithShortPassword
}