import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotificationMessage({message: `${user.name} logged in succesfully`, isError: false})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      window.localStorage.setItem('userJson', JSON.stringify(user))
    } catch {
      setNotificationMessage({message: 'wrong username or password', isError: true})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault() // not necessary I feel like
    try {
      blogService.setToken(null)
      setUser(null)
      window.localStorage.removeItem('userJson')
      //setUsername('')
      //setPassword('')
      setNotificationMessage({message: "Logged out successfuly", isError: false})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch {
      setNotificationMessage({message: "Could not log out", isError: true})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault() // not necessary I feel like
    try {
      console.log("hi, adding", title, author, url)
      const blog = await blogService.create({ title, author, url}); 
      setTitle('')
      setAuthor('')
      setUrl('')

      setNotificationMessage({message: `New blog ${blog.title} by ${blog.author} is added`, isError: false})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch {
      setNotificationMessage({message: "could not create the blog", isError: true})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>      
    </>
  )

  const blogsListed = () => (
    <>
      <h2>blogs</h2>
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const addBlog = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">addBlog</button>
      </form>      
    </>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('userJson')
    if (userJson) {
      const userJ = JSON.parse(userJson)
      setUser(userJ)
      blogService.setToken(userJ.token)
      //blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {notificationMessage && <Notification notificationMessage={notificationMessage}/>}
      {!user && loginForm()}
      {user && blogsListed()}
      {user && addBlog()}
    </div>
  )
}

export default App