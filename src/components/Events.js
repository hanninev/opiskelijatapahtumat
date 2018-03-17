import React from 'react'
import { Container, List, Card, Item, Button, Icon } from 'semantic-ui-react'

const dates = ['2018-03-21', '2018-03-22', '2018-03-23', '2018-03-24', '2018-03-25', '2018-03-26', '2018-03-27']

const Events = ({ events, location, organizer }) => {
    console.log(events)
    let eventsToShow = events

    if (location.length > 0) {
        eventsToShow = eventsToShow.filter(e => {
            if(e.place !== undefined) {
            return location.includes(e.place.name)
            }
        })
    }

    if (organizer.length > 0) {
        eventsToShow = eventsToShow.filter(e => {
            return organizer.includes(e.organizer)
        })
    }

    const getEvents = ( date ) => {
    const eventsPerDay = eventsToShow.filter(e => e.start_time.toString().substring(0, 10) === date.toString().substring(0, 10))
    return eventsPerDay
  }

  return (
    <Container>
    <Card.Group itemsPerRow='1'>
    {dates.map(d =>
    <Card key={d}>
    <Card.Content header={d} />
    <Card.Content description>
   <List divided relaxed>
      {getEvents(d).map((e, i) =>
    <List.Item key={i}>
      <List.Content>
        <List.Header as='a'>{e.name}</List.Header>
        <List.Description as='a'>{e.organizer}</List.Description>
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


export default Events