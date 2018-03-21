import axios from 'axios'

const getEvents = async () => {
  const events = await axios.get('http://localhost:3001/events')
  console.log(events.data)
  return events.data
}

const getOrganizers = async () => {
  const o = await axios.get('http://localhost:3001/organizers')
  return o.data
}

export default { getEvents, getOrganizers }