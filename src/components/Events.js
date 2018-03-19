import React from 'react'
import { Accordion, Container, List, Card, Item, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Events extends React.Component {
render() {

let eventsToShow = this.props.events
    
    if (this.props.filter.location.length > 0) {
        eventsToShow = eventsToShow.filter(e => {
            if(e.place !== undefined) {
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
    } else if (this.props.filter.organizer.length > 0) {
        eventsToShow = eventsFilterByOrganizer
    } else if (this.props.filter.organizerType.length > 0) {
        eventsToShow = eventsFilterByOrganizerType
    }

    const getEvents = ( date ) => {
        console.log(date)
    const eventsPerDay = eventsToShow.filter(e => e.start_time.toString().substring(0, 10) === date.toString().substring(0, 10))
    return eventsPerDay
  }

 const dates = [0, 1, 2, 3, 4, 5, 6]
 const eventUrl = 'https://www.facebook.com/events/'
  return (
    <Container>
    <Card.Group itemsPerRow='1'>
    {dates.map(d =>
    <Card key={d}>
    <Card.Content header={moment().add(d, 'd').format("dddd DD.MM.YYYY")} />
    <Card.Content>
   <List divided relaxed>
      {getEvents(moment().add(d, 'd').format()).map((e, i) =>
    <List.Item key={i}>
      <List.Content>
        <List.Header as='a' href={eventUrl + e.id}>{e.name}</List.Header>
        <List.Description>{e.organizer.name} | {e.place.name}</List.Description>
      </List.Content>
    </List.Item>
      )}
  </List>
  </Card.Content>
  </Card>
  )}
  </Card.Group>
    </Container>
  )}
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    filter: state.filter
  }
}

const ConnectedEvents = connect(
  mapStateToProps
)(Events)
export default ConnectedEvents

Events.contextTypes = {
  store: PropTypes.object
}