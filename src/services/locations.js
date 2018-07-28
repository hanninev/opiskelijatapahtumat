import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/locations'
// const url = 'http://localhost:3001/'

const getLocations = async () => {
  const request = await axios.get(url + '/')
  return request.data
}

const getUnacceptedLocations = async () => {
  const locations = await axios.get(url + '/unaccepted')
  return locations.data
}

const getLocation = async (id) => {
  const request = await axios.get(`${url}/${id}`)
  return request.then(response => { return response.data })
}

const createLocation = (event, user) => {
  let request
  console.log(user)
  if (user === null) {
    request = axios.post(url + '/', event)
  } else {
    const config = {
      headers: { 'Authorization': user.token }
    }
    request = axios.post(url + '/logged', event, config)
  }
  return request.then(response => { return response.data })
}

const updateLocation = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeLocation = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.delete(`${url}/${id}`, config)
  return request.then(response => { return response.data })
}

const acceptLocation = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.put(`${url}/accept/${id}`, null, config)
  return request.then(response => response.data)
}

export default { getLocations, getLocation, getUnacceptedLocations, acceptLocation, createLocation, updateLocation, removeLocation }