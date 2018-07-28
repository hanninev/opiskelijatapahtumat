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

const getUnacceptedEvents = async () => {
    const events = await axios.get(url + '/unaccepted')
    return events.data
}

const getEvent = async (id) => {
  const event = await axios.get(`${url}/${id}`)
  return event.then(response => { return response.data })
}

const createEvent = (event, user) => {
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
  return request.then(response => { return response })
}

const updateEvent = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const acceptEvent = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.put(`${url}/accept/${id}`, null, config)
  return request.then(response => response.data)
}

const removeEvent = (id, user) => {
  const config = {
    headers: { 'Authorization': user.token }
  }
  const request = axios.delete(`${url}/${id}`, config)
  return request.then(response => { return response.data })
}

export default { getEvents, getEvent, createEvent, getUnacceptedEvents, acceptEvent, updateEvent, removeEvent }