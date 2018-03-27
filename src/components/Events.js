import React from 'react'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectionInitialization } from '../reducers/selectionReducer'
import { setCurrentWeek } from '../reducers/calendarReducer'
import Week from './Week'

class Events extends React.Component {
    componentDidMount = () => {
      this.props.selectionInitialization()
      this.props.setCurrentWeek()
    }

    render() {
      let eventsToShow = this.props.calendar.events

      if (this.props.filter.location.length > 0) {
        eventsToShow = eventsToShow.filter(e => {
          if (e.place !== undefined) {
            console.log(this.props.filter.location)
            return this.props.filter.location.includes(e.place.name)
          }
        })
      }

      let eventsFilterByOrganizer = eventsToShow.filter(e => {
        return this.props.filter.organizer.includes(e.organizer.name)
      })
      console.log(this.props.filter)

      let eventsFilterByOrganizerType = eventsToShow.filter(e => {
        return this.props.filter.organizerType.includes(e.organizer.type)
      })
      console.log(this.props.filter)
      if (this.props.filter.organizer.length > 0 && this.props.filter.organizerType.length > 0) {
        eventsToShow = Array.from(new Set(eventsFilterByOrganizer.concat(eventsFilterByOrganizerType)))
      } else 
      if (this.props.filter.organizer.length > 0) {
        eventsToShow = eventsFilterByOrganizer
      } else if (this.props.filter.organizerType.length > 0) {
        eventsToShow = eventsFilterByOrganizerType
      }

      const getEvents = (date) => {
        console.log(date)
        const eventsPerDay = eventsToShow.filter(e => e.start_time.toString().substring(0, 10) === date.toString().substring(0, 10))
        return eventsPerDay
      }

      return (
        <Container>
          <Week getEvents={getEvents} />
        </Container>
      )
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
  selectionInitialization,
  setCurrentWeek
}


const ConnectedEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
export default ConnectedEvents

Events.contextTypes = {
  store: PropTypes.object
}