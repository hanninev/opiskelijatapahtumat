import React from 'react'
import { Table } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

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
              <Table.HeaderCell>Näytettävä nimi</Table.HeaderCell>
              <Table.HeaderCell>Hakusanat otsikoista ja kuvauksista</Table.HeaderCell>
              <Table.HeaderCell>Älä näytä, jos otsikko sisältää näitä sanoja</Table.HeaderCell>
              <Table.HeaderCell>Älä näytä näitä tapahtumia</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.selections.eventTypes.map(e =>
              <Table.Row key={e._id}>
                <Table.Cell>{e.text}</Table.Cell>
                <Table.Cell>
                  {e.searchAttributes.map(sa =>
                    <li key={sa}>{sa}</li>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {e.dontShowIfTitleContains.map(word =>
                    <li key={word}>{word}</li>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {e.dontShowEvents.map(event =>
                    <li key={event}>{event}</li>
                  )}
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