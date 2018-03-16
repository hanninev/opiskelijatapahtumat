import React from 'react'
import { Container, List } from 'semantic-ui-react'

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

  return (
    <Container>
  <List divided relaxed>
      {eventsToShow.map((e, i) =>
      <List.Item key={i}>
        <List.Content>
            <List.Header as='a'>{e.start_time}: {e.name}</List.Header>
            <List.Description as='a'>{e.organizer}</List.Description>
        </List.Content>
      </List.Item>
      )}
  </List>
    </Container>
  )}


export default Events