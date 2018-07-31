import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/event_types'
// const url = 'http://localhost:3001/'

const getEventTypes = async () => {
  const eventTypes = await axios.get(url + '/')
  return eventTypes.data
}

const getUnacceptedEventTypes = async () => {
  const events = await axios.get(url + '/unaccepted')
  return events.data
}

const getEventTypeByValues = async (eventType) => {
  const events = await axios.get(url + '/by_value?name=' + eventType.name)
  return events.data
}

const getEventType = async (id) => {
  const eventTypes = await axios.get(`${url}/${id}`)
  return eventTypes.then(response => { return response.data })
}

const createEventType = (event, user) => {
  let request
  console.log(user)
  if (user === null) {
    request = axios.post(url + '/', event)
  } else {
    const config = {
      headers: { 'Authorization': user.token }
    }
    request = axios.post(url + '/logged', event, config)
  } return request.then(response => { return response.data })
}

const updateEventType = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const acceptEventType = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.put(`${url}/accept/${id}`, null, config)
  return request.then(response => response.data)
}

const removeEventType = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.delete(`${url}/${id}`, config)
  return request.then(response => { return response.data })
}

export default { getEventTypes, getEventTypeByValues, getUnacceptedEventTypes, getEventType, acceptEventType, createEventType, updateEventType, removeEventType }