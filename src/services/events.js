import axios from 'axios'

const url = 'http://fb-opiskelijatapahtumat-back.herokuapp.com/'
// const url = 'http://localhost:3001/'

const getEvents = async (days) => {
  const format = days.map(d => d.format('YYYY-MM-DD'))
  console.log(format)
  const events = await axios.get(url + 'events?date=' + format)
  console.log(events.data)
  return events.data
}

const getOrganizers = async () => {
  const o = await axios.get(url + 'organizers')
  return o.data
}

const getOrganizerTypes = async () => {
  const o = await axios.get(url + 'organizer_types')
  return o.data
}

const getLocations = async () => {
  const o = await axios.get(url + 'events/locations')
  return o.data
}

const getEventTypes = async () => {
  const o = await axios.get(url + 'event_types')
  return o.data
}

const createEventType = async (blogObject) => {
  const response = await axios.post(url + 'admin/', blogObject)
  return response.data
}

const updateEventType = (id, newObject) => {
  console.log(newObject)
  const request = axios.put(`${url}admin/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getEvents, getOrganizers, getLocations, getOrganizerTypes, getEventTypes, createEventType, updateEventType }