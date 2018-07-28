import React from 'react'
import { Table, Header } from 'semantic-ui-react'
import moment from 'moment'

class Day extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      show: false
    }

    this.handleShow = this.handleShow.bind(this)
  }

  handleShow() {
    this.setState({ show: !this.state.show })
  }

  moreInfo(e) {
    if (this.state.show) {
      return (
        <div>
          <p>klo {moment(e.start_time).format('HH:mm')}</p>
          <p>{e.description}</p>
        </div>
      )
    }
  }

  render() {
    const { e, i } = this.props
    const organizers = e.organizers.map(o => o.name + '   ')
    const locations = e.locations.map(l => l.name + '   ')

    return (
      <Table.Row key={i} onClick={this.handleShow}>
        <Table.Cell textAlign='center' singleLine>
          <Header as='h4'>{e.name}</Header>
          <p>{organizers} | {locations} </p>
          {this.moreInfo(e)}
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default Day