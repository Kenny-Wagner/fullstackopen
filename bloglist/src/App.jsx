import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [info, setInfo] = useState({message: null})
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setCurrentUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='info') => {
    setInfo({message, type})

    setTimeout(() => {
      setInfo({message:null})
    }, 3000)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setCurrentUser(user)
      blogService.setToken(user.token)
      notifyWith(`Successfully logged-in as ${user.name}`)
    } catch(error) {
      notifyWith(`${error.response.data.error}`, 'error')
    }
  }

  const handleBlogSubmission = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      notifyWith(`new blog ${response.title} by ${response.author} has been added`)
      setBlogs(blogs.concat(response))
    }catch(error){
      notifyWith(`${error.response.data.error}`, 'error')
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const response = await blogService.update(updatedBlog)
      notifyWith(`blog ${response.title} by ${response.author}'s likes has been updated to ${response.likes}`)
      setBlogs( blogs.map(blog =>blog.id === response.id ? response : blog) )
    } catch(error) {
      notifyWith(`${error.response.data.error}`, 'error')
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      const shouldDelete = window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
      if(shouldDelete) {
        await blogService.deleteBlog(blogToDelete.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      }
    } catch(error) {
      notifyWith(`${error.response.data.error}`, 'error')
    }
  }

  if (currentUser === null) {
    return (
      <div>
        <Notification info ={info}/>
        <LoginForm 
          handleLogin ={handleLogin} username={username} 
          setUsername={setUsername} password ={password} setPassword={setPassword}  
        /> 
      </div>
    )
   }
   
  return (
    <div>
      <h2>blogs</h2>
      <Notification info ={info}/>
      <p> Logged in as {currentUser.name} 
        <button 
          onClick ={() => {
            window.localStorage.removeItem('loggedInBlogUser')
            setCurrentUser(null)
            }
          }
        > 
          logout
        </button>
      </p>
      <div>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm handleBlogSubmission={handleBlogSubmission}/>          
        </Togglable>
      </div>
      {
      
       blogs.sort((blog1, blog2) => blog2.likes -blog1.likes ).map(blog => 
        <Blog 
          key={blog.id}
          blog={blog} 
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          currentUser={currentUser}
        />) 
      }
    </div>
  )
}

export default App