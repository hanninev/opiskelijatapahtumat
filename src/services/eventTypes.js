import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/event_types'
// const url = 'http://localhost:3001/'

const getEventTypes = async () => {
  const eventTypes = await axios.get(url + '/')
  return eventTypes.data
}

const getEventType = async (id) => {
  const eventTypes = await axios.get(`${url}/${id}`)
  return eventTypes.then(response => { return response })
}

const createEventType = (event) => {
  const request = axios.post(url + '/', event)
  return request.then(response => { return response })
}

const updateEventType = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeEventType = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => { return response })
}

export default { getEventTypes, getEventType, createEventType, updateEventType, removeEventType }