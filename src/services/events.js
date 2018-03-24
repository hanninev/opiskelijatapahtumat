import axios from 'axios'
import moment from 'moment'

const getEvents = async ( days ) => {
  const format = days.map(d => moment().day(d).format('YYYY-MM-DD'))
  const events = await axios.get('http://localhost:3001/events?date=' + format)
  console.log(events.data)
  return events.data
}

const getOrganizers = async () => {
  const o = await axios.get('http://localhost:3001/organizers')
  return o.data
}

const getOrganizerTypes = async () => {
  const o = await axios.get('http://localhost:3001/organizer_types')
  return o.data
}

const getLocations = async () => {
  const o = await axios.get('http://localhost:3001/locations')
  return o.data
}

export default { getEvents, getOrganizers, getLocations, getOrganizerTypes }