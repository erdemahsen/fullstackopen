import { useState } from "react"

const Blog = ({ blog, handleUpdateBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(prev => !prev)
  }
  const likeBlog = () => {
    console.log("I am clicked")
    console.log("like blog", blog)
    const likedPost = {
      ...blog,
      likes: blog.likes +1,
      user: blog.user.id
    }
    handleUpdateBlog(likedPost)
  }

  //console.log(blog)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleView}>{view ? <>hide</> : <>view</> }</button>
      </div>

      {view && 
        <>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} 
            <button onClick={likeBlog}>Like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
        </>
      }
       
    </div>  
  )
}

export default Blog