import { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, currentUser}) => {
  
  const [showDetails, setshowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes+1
    }
    updateBlog(updatedBlog)
  }

    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick = {() => setshowDetails(!showDetails)}>
          {showDetails ? 'hide': 'view'}
        </button>
        {showDetails &&
          <div>
              <div>{blog.url}</div>
              <div>{blog.likes}
                <button onClick={increaseLikes}>like</button>              
              </div>
              <div>{blog.user.name}</div>
              {currentUser.username === blog.user.username &&
              <button onClick={() => deleteBlog(blog)}>delete</button>
              }
          </div>
        }
      </div>      
    )
}

export default Blog