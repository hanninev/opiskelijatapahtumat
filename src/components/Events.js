import React from 'react'
import { Accordion, Container, List, Card, Item, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'

 const dates = [-1, 0, 1, 2, 3, 4, 5, 6, 7]

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
        <List.Description>{e.organizer} | {e.place.name}</List.Description>
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