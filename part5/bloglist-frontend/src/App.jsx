import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotificationMessage({ message: `${user.name} logged in succesfully`, isError: false })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      window.localStorage.setItem('userJson', JSON.stringify(user))
    } catch {
      setNotificationMessage({ message: 'wrong username or password', isError: true })
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
      setNotificationMessage({ message: 'Logged out successfuly', isError: false })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch {
      setNotificationMessage({ message: 'Could not log out', isError: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const addBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({ title, author, url })
      setNotificationMessage({ message: `New blog ${blog.title} by ${blog.author} is added`, isError: false })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      await initializeBlogs()
    } catch {
      setNotificationMessage({ message: 'could not create the blog', isError: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogC) => {
    try {
      await blogService.update(blogC)
      setNotificationMessage({ message: 'blog is updated', isError: false })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      await initializeBlogs()
    } catch (error) {
      console.log('error', error)
      setNotificationMessage({ message: 'could not update the blog', isError: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogid) => {
    try {
      await blogService.deletee(blogid)
      setNotificationMessage({ message: 'blog is deleted', isError: false })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      await initializeBlogs()
    } catch (error) {
      console.log('error', error)
      setNotificationMessage({ message: 'could not delete the blog', isError: true })
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


  const initializeBlogs = async () => {
    const blogs = await blogService.getAll()

    setBlogs(blogs.sort((a, b) => b.likes - a.likes)) // easy sorting method
  }
  useEffect(() => {
    const userJson = window.localStorage.getItem('userJson')
    if (userJson) {
      const userJ = JSON.parse(userJson)
      setUser(userJ)
      blogService.setToken(userJ.token)
      //blogService.set
      // Token(user.token)
    }
    initializeBlogs()
  }, [])

  useEffect(() => {

  }, [])



  return (
    <div>
      {notificationMessage && <Notification notificationMessage={notificationMessage} />}
      {!user && loginForm()}
      {user &&
        <>
          <h2>blogs</h2>
          <div>
            {user.name} is logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <br></br>
        </>}
      {user && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlog={updateBlog} handleDeleteBlog={deleteBlog} currentUser={user}/>
      )}
      {user &&
        <Togglable buttonLabel="Create new blog ">
          <CreateBlog handleAddBlog={addBlog} />
        </Togglable>
      }


    </div>
  )
}

export default App