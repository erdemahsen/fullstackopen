const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const sum = (a, b)  => a+b
    return blogs.map(b => b.likes).reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length == 0) return null
    findMax = (a, b) => (a.likes > b.likes ? a : b)
    return blogs.reduce(findMax, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}