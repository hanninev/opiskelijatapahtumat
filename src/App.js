import React from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import Events from './components/Events'
import eventService from './services/events'
import userService from './services/user'
import { Container } from 'semantic-ui-react'
import LocationFilter from './components/LocationFilter'
import OrganizerFilter from './components/OrganizerFilter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      events: [],
      organizer: [],
      location: []
    }
  }

  componentDidMount = () => {
    try {
    userService.getUser().then(response => {
      this.setState({ username: response.data.name })
    })  

    eventService.getAll().then(response => {
      this.setState({ events: response })
    })  
    } catch (exception) {
      console.log(exception)
    }
    }

    handleLocation = (e, { value }) => {
      this.setState({ location: value })
    }

    handleOrganizer = (e, { value }) => {
      this.setState({ organizer: value })
    }

    getLocations = () => {
    const locations = this.state.events.map(e => 
    {
      if(e.place !== undefined) {
        return e.place.name 
        } 
    })
    const withoutUndefined = locations.filter(p => p !== undefined)
    const withoutDuplicates = Array.from(new Set(withoutUndefined))
    const inObjects = withoutDuplicates.map(p => {
        return { key: p, value: p, text: p }
    })
    console.log(inObjects)
    return inObjects
  }

      getOrganizers = () => {
    const organizers = this.state.events.map(e => 
    {
        return e.organizer 
    })
    const withoutDuplicates = Array.from(new Set(organizers))
    const inObjects = withoutDuplicates.map(p => {
        return { key: p, value: p, text: p }
    })
    console.log(inObjects)
    return inObjects
  }

  render() {
    const token = window.localStorage.getItem('user')
    console.log(token)
    console.log(this.getLocations())
    if (this.state.username === null) {
      return (
        <Container>
          <FacebookLoginButton />
        </Container>
      )
    } else {
      return (
        <Container>
        <OrganizerFilter organizer={this.getOrganizers()} handleOrganizer={this.handleOrganizer} />
        <LocationFilter places={this.getLocations()} handleLocation={this.handleLocation} />
          <Events events={this.state.events} location={this.state.location} organizer={this.state.organizer} />
        </Container>
      )
    }
  }
}

export default App