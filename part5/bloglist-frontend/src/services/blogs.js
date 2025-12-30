import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog =>  {
  const config = {
    headers: { Authorization: token }
  }
  console.log("blog creating")
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const {id, ...payload} = updatedBlog

  console.log("id",id)
  console.log("payload", payload)

  const updateUrl = baseUrl + "/" + id
  const response = await axios.put(updateUrl, payload, config)
  return response.data
}

export default { getAll, create, update, setToken}