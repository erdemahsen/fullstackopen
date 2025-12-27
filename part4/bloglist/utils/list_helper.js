const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const sum = (a, b)  => a+b
    return blogs.map(b => b.likes).reduce(sum, 0)
}

module.exports = {
  dummy,
  totalLikes
}