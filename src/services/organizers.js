import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/organizers'
// const url = 'http://localhost:3001/'

const getOrganizers = async () => {
  const request = await axios.get(url + '/')
  return request.data
}

const getUnacceptedOrganizers = async () => {
  const request = await axios.get(url + '/unaccepted')
  return request.data
}

const getOrganizerByValues = async (organizer) => {
  const events = await axios.get(url + '/by_value?name=' + organizer.name + '&organizer_type=' + organizer.organizer_type + '&faculty=' + organizer.faculty)
  return events.data
}

const getOrganizer = async (id) => {
  const request = await axios.get(`${url}/${id}`)
  return request.then(response => { return response.data })
}

const createOrganizer = (event, user) => {
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

const updateOrganizer = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeOrganizer = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.delete(`${url}/${id}`, config)
  return request.then(response => { return response.data })
}


const acceptOrganizer = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.put(`${url}/accept/${id}`, null, config)
  return request.then(response => response.data)
}

export default { getOrganizers, getOrganizerByValues, getOrganizer, getUnacceptedOrganizers, createOrganizer, acceptOrganizer, updateOrganizer, removeOrganizer }