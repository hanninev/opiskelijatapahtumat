import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class EventTypeList extends React.Component {
  constructor({ props }) {
    super(props)
  }

  render() {
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>event type</Table.HeaderCell>
              <Table.HeaderCell>search attributes</Table.HeaderCell>
              <Table.HeaderCell>don't show if title contains</Table.HeaderCell>
              <Table.HeaderCell>don't show events</Table.HeaderCell>
              <Table.HeaderCell>edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.selections.eventTypes.map(e =>
              <Table.Row key={e}>
                <Table.Cell>{e.text}</Table.Cell>
                <Table.Cell>
                  {e.searchAttributes.map(sa =>
                    <Table.Row key={sa}>
                      {sa}
                    </Table.Row>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {e.dontShowIfTitleContains.map(word =>
                    <Table.Row key={word}>
                      {word}
                    </Table.Row>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {e.dontShowEvents.map(event =>
                    <Table.Row key={event}>
                      {event}
                    </Table.Row>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Link to='admin/5af9b121207438714d203dfb'>muokkaa</Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default EventTypeList