import React from 'react'
import { Dropdown, Grid, Checkbox, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { organizerFilterCreation, organizerTypeFilterCreation, locationFilterCreation, eventTypeFilterCreation } from '../reducers/filterReducer'
import WeekNavigation from './WeekNavigation'
import { selectionInitialization } from '../reducers/selectionReducer'

class Filter extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      visible: false,
    }
  }

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
    if (!this.props.location.search.includes('comb')) {
      window.sessionStorage.setItem('comb', 'or')
    } else {
      searchAttr.map(s => {
        if (s.includes('comb')) {
          window.sessionStorage.setItem('comb', (s.split('=')[1]))
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
      this.props.location.search += 'event_type=' + window.sessionStorage.getItem('event_type') + '&'
    }
    if (window.sessionStorage.getItem('comb') !== undefined && window.sessionStorage.getItem('comb') !== '') {
      this.props.location.search += 'comb=' + window.sessionStorage.getItem('comb')
    }
    this.props.history.push(this.props.location.pathname + '?' + this.props.location.search)
  }

  handleOrganizerChange = (event, { value }) => {
    console.log(value)
    if (value[0] === '') {
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
    if (value[0] === '') {
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
    if (value[0] === '') {
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
    if (value[0] === '') {
      value.splice(0, 1)
    }
    window.sessionStorage.setItem('event_type', value)
    if (value.length === 0) {
      window.sessionStorage.setItem('event_type', '')
    }
    this.makeRoute()
  }

  handleOrChange = () => {
    window.sessionStorage.setItem('comb', 'or')
    this.makeRoute()
  }

  handleAndChange = () => {
    window.sessionStorage.setItem('comb', 'and')
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

    const locationFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        if (e.place !== undefined) {
          return locations.includes(e.place.name)
        }
      })
      return filteredList
    }

    const organizerFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        return organizers.includes(e.organizer.fbpage_id.toString())
      })
      return filteredList
    }

    const organizerTypeFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        return organizerTypes.includes(e.organizer.type.split(' ')[0])
      })
      return filteredList
    }

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
          if (eT.dontShowIfTitleContains.some(s => e.name.toLowerCase().indexOf(s.toLowerCase()) >= 0)) {
            continue
          }
          if (eT.searchAttributes.some(s => e.name.toLowerCase().indexOf(s.toLowerCase()) >= 0)) {
            return e
          } else if (e.description !== undefined) {
            if (eT.searchAttributes.some(s => e.description.toLowerCase().indexOf(s.toLowerCase()) >= 0)) {
              return e
            }
          }
        }
      })
      return filteredList
    }


    let commonList = []
    if (window.sessionStorage.getItem('locations') !== '') {
      commonList = Array.from(new Set(commonList.concat(locationFilter(this.props.calendar.events))))
    }
    if (window.sessionStorage.getItem('organizer_id') !== '') {
      commonList = Array.from(new Set(commonList.concat(organizerFilter(this.props.calendar.events))))
    }
    if (window.sessionStorage.getItem('organizer_type') !== '') {
      commonList = Array.from(new Set(commonList.concat(organizerTypeFilter(this.props.calendar.events))))
    }
    if (window.sessionStorage.getItem('event_type') !== '') {
      commonList = Array.from(new Set(commonList.concat(eventTypeFilter(this.props.calendar.events))))
    }

    let eventsToShow = []
    if (window.sessionStorage.getItem('comb') === 'or') {
      eventsToShow = commonList
    } else if (window.sessionStorage.getItem('comb') === 'and') {
      if (window.sessionStorage.getItem('locations') !== '') {
        eventsToShow.push(locationFilter(this.props.calendar.events))
      }
      if (window.sessionStorage.getItem('organizer_id') !== '') {
        eventsToShow.push(organizerFilter(this.props.calendar.events))
      }
      if (window.sessionStorage.getItem('organizer_type') !== '') {
        eventsToShow.push(organizerTypeFilter(this.props.calendar.events))
      }
      if (window.sessionStorage.getItem('event_type') !== '') {
        eventsToShow.push(eventTypeFilter(this.props.calendar.events))
      }

      eventsToShow = eventsToShow.filter(e => e.length > 0)
      commonList = commonList.filter(e => {
        return eventsToShow.every(array => {
          return array.includes(e)
        })
      })
      eventsToShow = commonList
      console.log(eventsToShow)
    }

    if (this.props.location.search.length <= 9) {
      eventsToShow = this.props.calendar.events
    }

    console.log(eventsToShow)

    const getEvents = (date) => {
      console.log(date)
      const eventsPerDay = eventsToShow.filter(e => e.start_time.toString().substring(0, 10) === date.toString().substring(0, 10))
      return eventsPerDay
    }
    console.log(this.props.history)

    const devices = () => {
      if (this.state.visible) {
        return 'computer tablet mobile'
      } else {
        return 'computer tablet'
      }
    }

    return (
      <div>
        <Grid columns={4} stackable={true} stretched={true}>
          <Grid.Row>
            <Grid.Column>
              Valitse tapahtuman tyyppi
              <Dropdown onChange={this.handleEventTypeChange} fluid multiple search closeOnChange selection options={getEventType()} defaultValue={eventTypes} />
            </Grid.Column>
            <Grid.Column only={devices()}>
              Valitse järjestäjä
              <Dropdown onChange={this.handleOrganizerChange} fluid multiple search closeOnChange selection options={getOrganizers()} defaultValue={organizers} />
            </Grid.Column>
            <Grid.Column only={devices()}>
              Valitse järjestäjän tyyppi
              <Dropdown onChange={this.handleOTypeChange} fluid multiple search closeOnChange selection options={getOrganizerTypes()} defaultValue={organizerTypes} />
            </Grid.Column>
            <Grid.Column only={devices()}>
              Valitse paikka
              <Dropdown onChange={this.handleLocationChange} fluid multiple search closeOnChange selection options={getLocations()} defaultValue={locations} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} stretched={true} centered={true}>
          <Grid.Row>
            <Grid.Column only={devices()}>
              <Checkbox radio label='Toteuttaa vähintään yhden hakuehdon' name='comb' checked={window.sessionStorage.getItem('comb') === 'or'} onChange={this.handleOrChange} />
            </Grid.Column>
            <Grid.Column only={devices()}>
              <Checkbox radio label='Toteuttaa kaikki hakuehdot' name='comb' checked={window.sessionStorage.getItem('comb') === 'and'} onChange={this.handleAndChange} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} >
            <Grid.Column only='mobile'>
              {!this.state.visible ? (
                <Button onClick={() => { this.setState({ visible: !this.state.visible }) }}><Icon name='arrow down' /> Näytä enemmän hakuehtoja</Button>
              ) : (
                <Button onClick={() => { this.setState({ visible: !this.state.visible }) }}><Icon name='arrow up' /> Näytä vähemmän hakuehtoja</Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <WeekNavigation getEvents={getEvents} location={this.props.location} />
      </div>
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