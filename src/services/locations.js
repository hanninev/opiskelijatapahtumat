import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/locations'
// const url = 'http://localhost:3001/'

const getLocations = async () => {
  const request = await axios.get(url + '/')
  return request.data
}

const getLocation = async (id) => {
  const request = await axios.get(`${url}/${id}`)
  return request.then(response => { return response.data })
}

const createLocation = (event) => {
  const request = axios.post(url + '/', event)
  return request.then(response => { return response.data })
}

const updateLocation = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeLocation = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => { return response.data })
}

export default { getLocations, getLocation, createLocation, updateLocation, removeLocation }