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

const _ = require('lodash');
const mostBlog = (blogs) => {
  if(blogs.length === 0) return null
  let freq = _.countBy(blogs.map(b => b.author));
  //console.log("hello",freq)
  const maxAuth = _.maxBy(Object.keys(freq), o => freq[o]);
  return {
    author: maxAuth,
    blogs: freq[maxAuth]
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null
  //console.log(_.groupBy(blogs, (b => b.author)))
  const grouped = _.groupBy(blogs, (b => b.author))
  const authorLikes = _.map(grouped, a => {
    //console.log("hi",a)
    return {
      author: a[0].author,
      likes: a.map(b => b.likes).reduce((k,l) => k + l, 0)
    }
  })
  //console.log("hi",authorLikes)
  return authorLikes.reduce((a, b) => a.likes >b.likes ? a : b, authorLikes[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}