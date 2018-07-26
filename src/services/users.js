import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/users'
// const url = 'http://localhost:3001/'

const getUsers = async () => {
  const request = await axios.get(url + '/')
  return request.data
}

const getUser = async (id) => {
  const request = await axios.get(`${url}/${id}`)
  return request.then(response => { return response })
}

const createUser = (event) => {
  const request = axios.post(url + '/', event)
  return request.then(response => { return response })
}

const updateUser = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeUser = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => { return response })
}

export default { getUsers, getUser, createUser, updateUser, removeUser }