import { useState } from "react"

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, currentUser}) => {
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
    const likedPost = {
      ...blog,
      likes: blog.likes +1,
      user: blog.user.id
    }
    handleUpdateBlog(likedPost)
  }
  
  const deleteBlog = () => {
    if(window.confirm(`You are deleting ${blog.title} post. Are you sure ? `)){
      handleDeleteBlog(blog.id)
    }
    // no need to put token or user info here, blogs.js handles the token stuff.
  }

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
          {currentUser.username === blog.user.username && <button onClick={deleteBlog}>remove</button>}
        </>
      }
       
    </div>  
  )
}

export default Blog