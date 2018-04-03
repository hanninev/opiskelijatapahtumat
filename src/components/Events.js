import React from 'react'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectionInitialization } from '../reducers/selectionReducer'
import WeekNavigation from './WeekNavigation'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class Events extends React.Component {
  componentDidMount = () => {
    this.props.selectionInitialization()
  }

  render() {
    let eventsToShow = []

    const locationFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        if (e.place !== undefined) {
          return this.props.filter.location.includes(e.place.name)
        }
      })
      return filteredList
    }

    console.log(locationFilter(eventsToShow))

    const organizerFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        return this.props.filter.organizer.includes(e.organizer.name)
      })
      return filteredList
    }

    console.log(organizerFilter(eventsToShow))

    const organizerTypeFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        return this.props.filter.organizerType.includes(e.organizer.type)
      })
      return filteredList
    }

    console.log(organizerTypeFilter(eventsToShow))

    const eventTypeFilter = (listToFilter) => {
      const filteredList = listToFilter.filter(e => {
        if (this.props.filter.eventType[0].dontShowEvents.includes(e.id)) {
          return false
        }
        if (this.props.filter.eventType[0].dontShowIfTitleContains.some(s => e.name.toLowerCase().indexOf(s) > 0)) {
          return false
        }
        if (this.props.filter.eventType[0].searchAttributes.some(s => e.name.toLowerCase().indexOf(s) > 0)) {
          return true
        } else if (e.description !== undefined) {
          return this.props.filter.eventType[0].searchAttributes.some(s => e.description.toLowerCase().indexOf(s) > 0)
        }
      })
      return filteredList
    }

    console.log(eventTypeFilter(eventsToShow))


    if (this.props.filter.location.length > 0) {
      eventsToShow = Array.from(new Set(eventsToShow.concat(locationFilter(this.props.calendar.events))))
    }
    if (this.props.filter.organizer.length > 0) {
      eventsToShow = Array.from(new Set(eventsToShow.concat(organizerFilter(this.props.calendar.events))))
    }
    if (this.props.filter.organizerType.length > 0) {
      eventsToShow = Array.from(new Set(eventsToShow.concat(organizerTypeFilter(this.props.calendar.events))))
    }
    if (this.props.filter.eventType.length > 0) {
      eventsToShow = Array.from(new Set(eventsToShow.concat(eventTypeFilter(this.props.calendar.events))))
    }

    if (this.props.filter.location.length === 0 && this.props.filter.organizer.length === 0 && this.props.filter.organizerType.length === 0 && this.props.filter.eventType.length === 0) {
      eventsToShow = this.props.calendar.events
    }

    console.log(eventsToShow)

    const getEvents = (date) => {
      console.log(date)
      const eventsPerDay = eventsToShow.filter(e => e.start_time.toString().substring(0, 10) === date.toString().substring(0, 10))
      return eventsPerDay
    }

    if (this.props.view.includes('week')) {
      return (
        <Container>
          <WeekNavigation getEvents={getEvents} />
        </Container>
      )
    } else {
      <Container>
        <p>myöhemmin tulossa kuukausinäkymä</p>
      </Container>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    user: state.user,
    calendar: state.calendar
  }
}

const mapDispatchToProps = {
  selectionInitialization
}


const ConnectedEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
export default ConnectedEvents

Events.contextTypes = {
  store: PropTypes.object
}