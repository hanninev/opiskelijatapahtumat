import React from 'react'
import { Grid, Card, Container, Table } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Day from './Day'
import { setWeekAndEvents } from '../reducers/calendarReducer'
import eventService from '../services/events'

class Week extends React.Component {
  constructor({ props }) {
    super(props)

    this.handleEventRemove = this.handleEventRemove.bind(this)
  }

  async handleEventRemove(e) {
    await eventService.removeEvent(e.target.value, this.props.user.loggedIn)
    this.props.setWeekAndEvents(moment(this.props.date))
  }

  componentDidMount = () => {
    this.props.setWeekAndEvents(moment(this.props.date))
  }

  render() {
    const divStyle = {
      backgroundColor: '#E0F2F7'
    }
    return (
      <Container>
        <Grid columns={1}>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Card.Group itemsPerRow='1'>
              {this.props.calendar.days.map(d =>
                <Card key={d}>
                  <Card.Content header={d.format('dddd DD.MM.YYYY')} />
                  <Card.Content style={divStyle}>
                    <Table celled selectable>
                      <Table.Body>
                        {this.props.getEvents(d.format('YYYY-MM-DD')).map((e, i) =>
                          <Day key={i} e={e} i={i} history={this.props.history} location={this.props.location} handleRemove={this.handleEventRemove} />
                        )}
                      </Table.Body>
                    </Table>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar,
    user: state.user
  }
}

const mapDispatchToProps = {
  setWeekAndEvents
}

const ConnectedWeek = connect(
  mapStateToProps,
  mapDispatchToProps
)(Week)
export default ConnectedWeek

Week.contextTypes = {
  store: PropTypes.object
}