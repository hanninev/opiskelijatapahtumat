import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/organizers'
// const url = 'http://localhost:3001/'

const getOrganizers = async () => {
  const request = await axios.get(url + '/')
  return request.data
}

const getOrganizer = async (id) => {
  const request = await axios.get(`${url}/${id}`)
  return request.then(response => { return response })
}

const createOrganizer = (event) => {
  const request = axios.post(url + '/', event)
  return request.then(response => { return response })
}

const updateOrganizer = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeOrganizer = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => { return response })
}

export default { getOrganizers, getOrganizer, createOrganizer, updateOrganizer, removeOrganizer }