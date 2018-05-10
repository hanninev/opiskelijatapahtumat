import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { organizerFilterCreation, organizerTypeFilterCreation, locationFilterCreation, eventTypeFilterCreation } from '../reducers/filterReducer'
import WeekNavigation from './WeekNavigation'
import { selectionInitialization } from '../reducers/selectionReducer'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import moment from 'moment'

class Filter extends React.Component {
  componentWillMount = () => {
    this.props.selectionInitialization()
    const searchAttr = this.props.location.search.split('&')
    console.log(searchAttr)

    if (!this.props.location.search.includes('organizer_id')) {
      window.sessionStorage.setItem('organizer_id', '')
    } else {
      searchAttr.map(s => {
        if (s.includes('organizer_id')) {
          window.sessionStorage.setItem('organizer_id', (s.split('=')[1]))
        }
      })
    }
    if (!this.props.location.search.includes('organizer_type')) {
      window.sessionStorage.setItem('organizer_type', '')
    } else {
      searchAttr.map(s => {
        if (s.includes('organizer_type')) {
          window.sessionStorage.setItem('organizer_type', (s.split('=')[1]))
        }
      })
    }
    if (!this.props.location.search.includes('location')) {
      window.sessionStorage.setItem('location', '')
    } else {
      searchAttr.map(s => {
        if (s.includes('location')) {
          window.sessionStorage.setItem('location', (s.split('=')[1]))
        }
      })
    }
    if (!this.props.location.search.includes('event_type')) {
      window.sessionStorage.setItem('event_type', '')
    } else {
      searchAttr.map(s => {
        if (s.includes('event_type')) {
          window.sessionStorage.setItem('event_type', (s.split('=')[1]))
        }
      })
    }

    this.makeRoute()
  }

  makeRoute = () => {
    this.props.location.search = ''
    if (window.sessionStorage.getItem('organizer_id') !== undefined && window.sessionStorage.getItem('organizer_id') !== '') {
      this.props.location.search += 'organizer_id=' + window.sessionStorage.getItem('organizer_id') + '&'
    }
    if (window.sessionStorage.getItem('organizer_type') !== undefined && window.sessionStorage.getItem('organizer_type') !== '') {
      this.props.location.search += 'organizer_type=' + window.sessionStorage.getItem('organizer_type') + '&'
    }
    if (window.sessionStorage.getItem('location') !== undefined && window.sessionStorage.getItem('location') !== '') {
      this.props.location.search += 'location=' + window.sessionStorage.getItem('location') + '&'
    }
    if (window.sessionStorage.getItem('event_type') !== undefined && window.sessionStorage.getItem('event_type') !== '') {
      this.props.location.search += 'event_type=' + window.sessionStorage.getItem('event_type')
    }
    this.props.history.push(this.props.location.pathname + '?' + this.props.location.search)
  }

  handleOrganizerChange = (event, { value }) => {
    console.log(value)
    if(value[0] === '') {
      value.splice(0, 1)
    }
    window.sessionStorage.setItem('organizer_id', value)
    if (value.length === 0) {
      window.sessionStorage.setItem('organizer_id', '')
    }
    this.makeRoute()
  }

  handleOTypeChange = (event, { value }) => {
    console.log(value)
    if(value[0] === '') {
      value.splice(0, 1)
    }
    window.sessionStorage.setItem('organizer_type', value)
    if (value.length === 0) {
      window.sessionStorage.setItem('organizer_type', '')
    }
    this.makeRoute()
  }

  handleLocationChange = (event, { value }) => {
    console.log(value)
    if(value[0] === '') {
      value.splice(0, 1)
    }
    window.sessionStorage.setItem('location', value)
    if (value.length === 0) {
      window.sessionStorage.setItem('location', '')
    }
    this.makeRoute()
  }

  handleEventTypeChange = (event, { value }) => {
    console.log(value)
    if(value[0] === '') {
      value.splice(0, 1)
    }
    window.sessionStorage.setItem('event_type', value)
    if (value.length === 0) {
      window.sessionStorage.setItem('event_type', '')
    }
    this.makeRoute()
  }

  render() {
    console.log(window.sessionStorage.getItem('organizer_id'))
    const organizers = window.sessionStorage.getItem('organizer_id').split(',')
    const locations = window.sessionStorage.getItem('location').split(',')
    const organizerTypes = window.sessionStorage.getItem('organizer_type').split(',')
    const eventTypes = window.sessionStorage.getItem('event_type').split(',')


    const getEventType = () => {
      const inObjects = this.props.selections.eventTypes.map(p => {
        return { key: p.text, value: p.text, text: p.text }
      })
      return inObjects
    }

    const getOrganizers = () => {
      console.log(this.props.selections)
      const inObjects = this.props.selections.organizers.map(p => {
        return { key: p.fbpage_id.toString(), value: p.fbpage_id.toString(), text: p.name }
      })
      console.log(inObjects)
      return inObjects
    }

    const getOrganizerTypes = () => {
      const types = this.props.selections.organizers.map(organizer => {
        return organizer.type
      })
      const withoutDuplicates = Array.from(new Set(types))
      const inObjects = withoutDuplicates.map(p => {
        return { key: p.split(' ')[0], value: p.split(' ')[0], text: p }
      })
      console.log(inObjects)
      return inObjects
    }

    const getLocations = () => {
      const inObjects = this.props.selections.locations.map(p => {
        return { key: p, value: p, text: p }
      })
      console.log(inObjects)
      return inObjects
    }

    let eventsToShow = []

    const locationFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        if (e.place !== undefined) {
          return locations.includes(e.place.name)
        }
      })
      return filteredList
    }

    console.log(locationFilter(eventsToShow))

    const organizerFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        return organizers.includes(e.organizer.fbpage_id.toString())
      })
      return filteredList
    }

    console.log(organizerFilter(eventsToShow))

    const organizerTypeFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        return organizerTypes.includes(e.organizer.type.split(' ')[0])
      })
      return filteredList
    }

    console.log(organizerTypeFilter(eventsToShow))
    const selectedEventTypes = this.props.selections.eventTypes.filter(et => {
      return eventTypes.includes(et.text)
    })
    
    const eventTypeFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        for (let index = 0; index < selectedEventTypes.length; index++) {
          const eT = selectedEventTypes[index]
          if (eT.dontShowEvents.includes(e.id)) {
            continue
          }
          if (eT.dontShowIfTitleContains.some(s => e.name.toLowerCase().indexOf(s) > 0)) {
            continue
          }        
          if (eT.searchAttributes.some(s => e.name.toLowerCase().indexOf(s) > 0)) {
            return e
          } else if (e.description !== undefined) {
            if (eT.searchAttributes.some(s => e.description.toLowerCase().indexOf(s) > 0)) {
              return e
            }
          }
        } 
      })
      return filteredList
    }

    console.log(eventTypeFilter(eventsToShow))


    if (window.sessionStorage.getItem('locations') !== '') {
      eventsToShow = Array.from(new Set(eventsToShow.concat(locationFilter(this.props.calendar.events))))
    }
    if (window.sessionStorage.getItem('organizer_id') !== '') {
      eventsToShow = Array.from(new Set(eventsToShow.concat(organizerFilter(this.props.calendar.events))))
    }
    if (window.sessionStorage.getItem('organizer_type') !== '') {
      eventsToShow = Array.from(new Set(eventsToShow.concat(organizerTypeFilter(this.props.calendar.events))))
    }
    if (window.sessionStorage.getItem('event_type') !== '') {
      eventsToShow = Array.from(new Set(eventsToShow.concat(eventTypeFilter(this.props.calendar.events))))
    }

    if (this.props.location.search.length === 0) {
      eventsToShow = this.props.calendar.events
    }

    console.log(eventsToShow)

    const getEvents = (date) => {
      console.log(date)
      const eventsPerDay = eventsToShow.filter(e => e.start_time.toString().substring(0, 10) === date.toString().substring(0, 10))
      return eventsPerDay
    }

    const lastMonday = moment().isoWeekday(1).format('YYYY-MM-DD')
    const redirectWeek = '/week/' + lastMonday

    return (
      <Router>
        <div>
          <Grid columns={4} stackable={true} stretched={true}>
            <Grid.Row>
              <Grid.Column>
                <Dropdown onChange={this.handleEventTypeChange} placeholder='Valitse tapahtuman tyyppi' fluid multiple search closeOnChange selection options={getEventType()} defaultValue={eventTypes}/>
              </Grid.Column>
              <Grid.Column>
                <Dropdown onChange={this.handleOrganizerChange} placeholder='Valitse järjestäjä' fluid multiple search closeOnChange selection options={getOrganizers()} defaultValue={organizers} />
              </Grid.Column>
              <Grid.Column>
                <Dropdown onChange={this.handleOTypeChange} placeholder='Valitse järjestäjän tyyppi' fluid multiple search closeOnChange selection options={getOrganizerTypes()} defaultValue={organizerTypes} />
              </Grid.Column>
              <Grid.Column only='computer tablet'>
                <Dropdown onChange={this.handleLocationChange} placeholder='Valitse paikka' fluid multiple search closeOnChange selection options={getLocations()} defaultValue={locations} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Route exact path="/" render={() => {
            return <Redirect to={redirectWeek} />
          }} /> 
          <Route path="/week/" render={() => {
            return <WeekNavigation getEvents={getEvents} location={this.props.location} />
          }} /> 
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    selections: state.selections,
    calendar: state.calendar
  }
}

const mapDispatchToProps = {
  organizerFilterCreation,
  organizerTypeFilterCreation,
  locationFilterCreation,
  eventTypeFilterCreation,
  selectionInitialization
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
export default ConnectedFilter

Filter.contextTypes = {
  store: PropTypes.object
}