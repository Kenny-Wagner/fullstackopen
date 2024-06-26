import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (theToken) => {
    token = `Bearer ${theToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, create, setToken, update, deleteBlog }