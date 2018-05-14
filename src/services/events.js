import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/'

const getEvents = async ( days ) => {
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
  const o = await axios.get(url + 'locations')
  return o.data
}

const getEventTypes = async () => {
  const o = await axios.get(url + 'event_types')
  return o.data
}

export default { getEvents, getOrganizers, getLocations, getOrganizerTypes, getEventTypes }