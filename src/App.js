import React from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import Events from './components/Events'
import eventService from './services/events'
import userService from './services/user'
import { Container } from 'semantic-ui-react'
import LocationFilter from './components/LocationFilter'
import OrganizerFilter from './components/OrganizerFilter'
import OrganizerTypeFilter from './components/OrganizerTypeFilter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      dates: [],
      events: [],
      organizers: [],
      filterOrganizer: [],
      filterOrganizerType: [],
      filterLocation: []
    }
  }

  componentDidMount = async () => {
    if (window.localStorage.getItem('user') !== null) {
    await userService.getUser().then(response => {
      this.setState({ username: response.data.name })
    })  

    await eventService.getOrganizers().then(response => {
      this.setState({ organizers: response })
    }) 

    await eventService.getAll(this.state.organizers).then(response => {
      this.setState({ events: response })
    })  
    }
    }

    handleLocation = (e, { value }) => {
      this.setState({ filterLocation: value })
    }

    handleOrganizer = (e, { value }) => {
      this.setState({ filterOrganizer: value })
    }

    handleOrganizerType = (e, { value }) => {
      this.setState({ filterOrganizerType: value })
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
    return inObjects
  }

    getOrganizers = () => {
    const inObjects = this.state.organizers.map(p => {
        return { key: p.fbpage_id, value: p.name, text: p.name }
    })
    return inObjects
  }

    getOrganizerTypes = () => {
    const types = this.state.organizers.map(organizer => 
    {
        return organizer.type 
    })
    const withoutDuplicates = Array.from(new Set(types))
    const inObjects = withoutDuplicates.map(p => {
        return { key: p, value: p, text: p }
    })
    return inObjects
  }

  render() {
    const token = window.localStorage.getItem('user')
    console.log(token)
    if (window.localStorage.getItem('user') === null) {
      return (
        <Container>
          <FacebookLoginButton user={this.state.username} />
        </Container>
      )
    } else {
      return (
        <Container>
        <OrganizerFilter organizer={this.getOrganizers()} handleOrganizer={this.handleOrganizer} />
        <OrganizerTypeFilter organizerType={this.getOrganizerTypes()} handleOrganizerType={this.handleOrganizerType} />
        <LocationFilter places={this.getLocations()} handleLocation={this.handleLocation} />
        <div>.</div>
          <Events events={this.state.events} location={this.state.filterLocation} organizer={this.state.filterOrganizer} organizerType={this.state.filterOrganizerType} />
        </Container>
      )
    }
  }
}

export default App