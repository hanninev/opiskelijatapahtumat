import axios from 'axios'

const host = 'https://opiskelijatapahtumat-backend.herokuapp.com/'

const getEvents = async ( days ) => {
  const format = days.map(d => d.format('YYYY-MM-DD'))
  console.log(format)
  const events = await axios.get(host + 'events?date=' + format)
  console.log(events.data)
  return events.data
}

const getOrganizers = async () => {
  const o = await axios.get(host + 'organizers')
  return o.data
}

const getOrganizerTypes = async () => {
  const o = await axios.get(host + 'organizer_types')
  return o.data
}

const getLocations = async () => {
  const o = await axios.get(host + 'locations')
  return o.data
}

const getEventTypes = async () => {
  const o = await axios.get(host + 'event_types')
  return o.data
}

export default { getEvents, getOrganizers, getLocations, getOrganizerTypes, getEventTypes }