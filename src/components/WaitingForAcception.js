import React from 'react'
import { Table, Header, Button, Grid } from 'semantic-ui-react'
import eventService from '../services/events'
import locationService from '../services/locations'
import organizerService from '../services/organizers'
import eventTypeService from '../services/eventTypes'
import { setMessage } from '../reducers/messageReducer'
import { connect } from 'react-redux'
import moment from 'moment'

class WaitingForAcception extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      events: [],
      locations: [],
      organizers: [],
      eventTypes: []
    }
    this.handleEventAcception = this.handleEventAcception.bind(this)
    this.handleEventRemove = this.handleEventRemove.bind(this)

    this.handleEventTypeAcception = this.handleEventTypeAcception.bind(this)
    this.handleEventTypeRemove = this.handleEventTypeRemove.bind(this)

    this.handleLocationAcception = this.handleLocationAcception.bind(this)
    this.handleLocationRemove = this.handleLocationRemove.bind(this)

    this.handleOrganizerAcception = this.handleOrganizerAcception.bind(this)
    this.handleOrganizerRemove = this.handleOrganizerRemove.bind(this)
  }

  async componentDidMount() {
    this.setState({
      events: await eventService.getUnacceptedEvents(),
      locations: await locationService.getUnacceptedLocations(),
      organizers: await organizerService.getUnacceptedOrganizers(),
      eventTypes: await eventTypeService.getUnacceptedEventTypes()
    })
    console.log(this.state.events)
  }

  async handleEventAcception(e) {
    await eventService.acceptEvent(e.target.value, this.props.user.loggedIn)
    this.setState({ events: await eventService.getUnacceptedEvents() })
  }

  async handleEventRemove(e) {
    await eventService.removeEvent(e.target.value, this.props.user.loggedIn)
    this.setState({ events: await eventService.getUnacceptedEvents() })
  }


  async handleEventTypeAcception(e) {
    await eventTypeService.acceptEventType(e.target.value, this.props.user.loggedIn)
    this.setState({ eventTypes: await eventTypeService.getUnacceptedEventTypes() })
  }

  async handleEventTypeRemove(e) {
    await eventTypeService.removeEventType(e.target.value, this.props.user.loggedIn)
    this.setState({
      eventTypes: await eventTypeService.getUnacceptedEventTypes(),
      events: await eventService.getUnacceptedEvents()
    })
  }


  async handleLocationAcception(e) {
    await locationService.acceptLocation(e.target.value, this.props.user.loggedIn)
    this.setState({ locations: await locationService.getUnacceptedLocations() })
  }

  async handleLocationRemove(e) {
    await locationService.removeLocation(e.target.value, this.props.user.loggedIn)
    this.setState({
      locations: await locationService.getUnacceptedLocations(),
      events: await eventService.getUnacceptedEvents()
    })
  }

  async handleOrganizerAcception(e) {
    await organizerService.acceptOrganizer(e.target.value, this.props.user.loggedIn)
    this.setState({ organizers: await organizerService.getUnacceptedOrganizers() })
  }

  async handleOrganizerRemove(e) {
    await organizerService.removeOrganizer(e.target.value, this.props.user.loggedIn)
    this.setState({
      organizers: await organizerService.getUnacceptedOrganizers(),
      events: await eventService.getUnacceptedEvents()
    })
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column md={6}>
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Hyväksymättömät tapahtumat</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.events.map((e, i) =>
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Grid columns={2}>
                          <Grid.Row>
                            <Grid.Column md={9}>
                              <Header as='h4'>Nimi: {e.name}</Header>
                              <p>Alkamisaika: {moment(e.start_time).format('DD.MM.YYYY HH:MM')}</p>
                              <p>Päättymismisaika: {moment(e.end_time).format('DD.MM.YYYY HH:MM')}</p>
                            </Grid.Column>
                            <Grid.Column>
                              <div align='right'><Button color='green' value={e.id} onClick={this.handleEventAcception}>Hyväksy</Button></div>
                              <br />
                              <div align='right'><Button color='red' value={e.id} onClick={this.handleEventRemove}> Poista </Button></div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <p>Kuvaus: {e.description}</p>
                        <p>Sijainti: {e.locations.map(l =>
                          <li key={l._id}>{l.name}, {l.address}</li>
                        )}</p>
                        <p>Järjestäjät: {e.organizers.map(o =>
                          <li key={o._id}>{o.name}</li>
                        )}</p>
                        <p>Tyyppi:
                {e.eventTypes.map(et =>
                            <li key={et._id}>{et.name}</li>
                          )}</p>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Hyväksymättömät tapahtumatyypit</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.eventTypes.map((e, i) =>
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Grid columns={2}>
                          <Grid.Row>
                            <Grid.Column md={9}>
                              <Header as='h4'>{e.name}</Header>
                            </Grid.Column>
                            <Grid.Column>
                              <div align='right'><Button color='green' value={e.id} onClick={this.handleEventTypeAcception}>Hyväksy</Button>
                                <Button color='red' value={e.id} onClick={this.handleEventTypeRemove}> Poista </Button></div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Hyväksymättömät sijainnit</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.locations.map((e, i) =>
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Grid columns={2}>
                          <Grid.Row>
                            <Grid.Column md={9}>
                              <Header as='h4'>{e.name}</Header>
                              <p>Osoite: {e.address}</p>
                            </Grid.Column>
                            <Grid.Column>
                              <div align='right'><Button color='green' value={e.id} onClick={this.handleLocationAcception}>Hyväksy</Button>
                                <Button color='red' value={e.id} onClick={this.handleLocationRemove}> Poista </Button></div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Hyväksymättömät järjestäjät</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.organizers.map((e, i) =>
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Grid columns={2}>
                          <Grid.Row>
                            <Grid.Column md={9}>
                              <Header as='h4'>{e.name}</Header>
                              <p>Tyyppi: {e.organizer_type}</p>
                              <p>Tiedekunta: {e.faculty}</p>
                            </Grid.Column>
                            <Grid.Column>
                              <div align='right'><Button color='green' value={e.id} onClick={this.handleOrganizerAcception}>Hyväksy</Button>
                                <Button color='red' value={e.id} onClick={this.handleOrganizerRemove}> Poista </Button></div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
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

const ConnectedWaitingForAcception = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingForAcception)
export default ConnectedWaitingForAcception
