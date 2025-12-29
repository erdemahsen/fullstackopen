//const Blog = require('../models/blog')
//const User = require('../models/blog')

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

const blogToAdd = {
    title: "What is AI",
    author: "Erdem",
    url: "https://www.erdemahsen.com/what-is-ai",
    likes: 13
}

const blogToAddNoLikes = {
    title: "this post have no likes provided",
    author: "Erdem :(",
    url: "https://www.erdemahsen.com/no-liker",
}

const blogToFail = {
  author: "Erdem",
  likes: 13
}

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

module.exports = {
  initialBlogs, blogToAdd, blogToAddNoLikes, blogToFail, userToAdd, userWithShortUsername, userWithShortPassword
}