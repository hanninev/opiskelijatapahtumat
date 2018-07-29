import React from 'react'
import { Table, Header, Button } from 'semantic-ui-react'
import moment from 'moment'
import { connect } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'
import AddEvent from '../components/AddEvent'

class Day extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      show: false,
      edit: false
    }

    this.handleShow = this.handleShow.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleShow() {
    this.setState({ show: !this.state.show })
  }

  handleEdit() {
    this.setState({ edit: true })
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

  adminTools(e) {
    if (this.props.user.loggedIn !== null && this.props.user.loggedIn.admin) {
      return (
        <div>
          <Button color='red' value={e.id} onClick={this.props.handleRemove}>Poista</Button>
          <Button onClick={this.handleEdit}>Muokkaa</Button>
        </div>
      )
    }
  }

  render() {
    const { e, i } = this.props
    const organizers = e.organizers.map(o => o.name + '   ')
    const locations = e.locations.map(l => l.name + '   ')
    if (this.state.edit) {
      return (
          <AddEvent event={e} history={this.props.history} location={this.props.location} />
      )
    }
    return (
      <Table.Row key={i} onClick={this.handleShow}>
        <Table.Cell textAlign='center' singleLine>
          <Header as='h4'>{e.name}</Header>
          <p>{organizers} | {locations} </p>
          {this.moreInfo(e)}
          {this.adminTools(e)}
        </Table.Cell>
      </Table.Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setMessage
}

const ConnectedDay = connect(
  mapStateToProps,
  mapDispatchToProps
)(Day)
export default ConnectedDay