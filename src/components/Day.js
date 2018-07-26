import React from 'react'
import { List } from 'semantic-ui-react'

class Day extends React.Component {
  constructor({ props }) {
    super(props)
  }

  render() {
    const { e, i } = this.props
    const organizers = e.organizers.map(o => o.name + '   ')
    const locations = e.locations.map(l => l.name + '   ')

    return (
      <List.Item key={i}>
        <List.Content>
          <List.Header>{e.name}</List.Header>
          <List.Description>{organizers} | {locations} </List.Description>
        </List.Content>
      </List.Item>
    )}
}

export default Day