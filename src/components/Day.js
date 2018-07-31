import React from 'react'
import { Table, Header, Button, Grid } from 'semantic-ui-react'
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
    this.setState({ edit: !this.state.edit })
  }

  moreInfo(e) {
    if (this.state.show) {
      return (
        <div>
          <Header as='h3'>{e.name}</Header>
          <Grid>
            <Grid.Row only='computer tablet'>
              <Grid.Column width={5}>
                <p><b>Alkaa:</b> {moment(e.start_time).subtract(3, 'h').format('DD.MM.YYYY')} klo {moment(e.start_time).subtract(3, 'h').format('HH:mm')}</p>
                <p><b>Päättyy:</b> {moment(e.end_time).subtract(3, 'h').format('DD.MM.YYYY')} klo {moment(e.end_time).subtract(3, 'h').format('HH:mm')}</p>
                <p><b>Paikka:</b><br />
                  {e.locations.map((l, i) => {
                    return (
                      <div key={i}>{l.name} <br />
                        {l.address}</div>
                    )
                  })}</p>
                <p><b>Järjestäjät:</b><br />
                  {e.organizers.map((o, i) => {
                    if (i + 1 === e.organizers.length) {
                      return o.name
                    } else {
                      return (<div>{o.name} <br /></div>)
                    }
                  })}</p>
                <p><b>Tyyppi:</b><br />
                  {e.eventTypes.map((o, i) => {
                    if (i + 1 === e.eventTypes.length) {
                      return o.name
                    } else {
                      return (<div>{o.name} <br /></div>)
                    }
                  })}</p>
              </Grid.Column>
              <Grid.Column width={11}>
                <p>{e.description}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row only='mobile'>
              <Grid.Column>
                <p><b>Alkaa:</b> {moment(e.start_time).subtract(3, 'h').format('DD.MM.YYYY')} klo {moment(e.start_time).subtract(3, 'h').format('HH:mm')}</p>
                <p><b>Päättyy:</b> {moment(e.end_time).subtract(3, 'h').format('DD.MM.YYYY')} klo {moment(e.end_time).subtract(3, 'h').format('HH:mm')}</p>
                <p><b>Paikka:</b><br />
                  {e.locations.map((l, i) => {
                    return (
                      <div key={i}>{l.name} <br />
                        {l.address}</div>
                    )
                  })}</p>
                <p><b>Järjestäjät:</b><br />
                  {e.organizers.map((o, i) => {
                    if (i + 1 === e.organizers.length) {
                      return o.name
                    } else {
                      return (<div>{o.name} <br /></div>)
                    }
                  })}</p>
                <p><b>Tyyppi:</b><br />
                  {e.eventTypes.map((o, i) => {
                    if (i + 1 === e.eventTypes.length) {
                      return o.name
                    } else {
                      return (<div>{o.name} <br /></div>)
                    }
                  })}</p>
                <p>{e.description}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <p><b>{e.name}</b><br />
            {e.organizers.map((o, i) => {
              if (i + 1 === e.organizers.length) {
                return o.name
              } else {
                return o.name + ', '
              }
            })}</p></div>)
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
    if (this.state.edit) {
      return (
        <div>
          <br />
          <AddEvent event={e} handleRemove={this.props.handleRemove} undo={this.handleEdit} history={this.props.history} location={this.props.location} />
          <br />
        </div>
      )
    }
    return (
      <Table.Row key={i} onClick={this.handleShow}>
        <Table.Cell textAlign='center'>
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