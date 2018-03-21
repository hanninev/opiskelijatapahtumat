import React from 'react'
import { List } from 'semantic-ui-react'

class Day extends React.Component {
  constructor({ props }) {
    super(props)
  }

  render() {
    const { e, i } = this.props
    const eventUrl = 'https://www.facebook.com/events/'
    const eventName = e.name
    let placeName = ''
    if (e.place !== undefined) {
      placeName = e.place.name
    }
    const organizerName = e.owner.name
    const eventId = e.id
    return (
      <List.Item key={i}>
        <List.Content>
          <List.Header as='a' href={eventUrl + eventId}>{eventName}</List.Header>
          <List.Description>{organizerName} | {placeName}</List.Description>
        </List.Content>
      </List.Item>
    )}
}

export default Day