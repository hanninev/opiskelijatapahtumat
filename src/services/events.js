import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/events'
// const url = 'http://localhost:3001/'

const getEvents = async (start, end) => {
  if (start === undefined || end === undefined) {
  const events = await axios.get(url)
  return events.data
  }

  const events = await axios.get(url + '?start=' + start + '&end=' + end)
  return events.data
}

const getEvent = async (id) => {
  const event = await axios.get(`${url}/${id}`)
  return event.then(response => { return response.data })
}

const createEvent = (event) => {
  const request = axios.post(url + '/', event)
  return request.then(response => { return response.data })
}

const updateEvent = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeEvent = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => { return response.data })
}

export default { getEvents, getEvent, createEvent, updateEvent, removeEvent }