import React from 'react'
import { Grid, List, Card, Container } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Day from './Day'
import { setWeekAndEvents } from '../reducers/calendarReducer'

class Week extends React.Component {
  constructor({ props }) {
    super(props)
  }

  componentDidMount = () => {
    this.props.setWeekAndEvents(moment(this.props.date))
  }

  render() {
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
                  <Card.Content>
                    <List divided relaxed>
                      {this.props.getEvents(d.format('YYYY-MM-DD')).map((e, i) =>
                        <Day key={i} e={e} i={i} />
                      )}
                    </List>
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
    calendar: state.calendar
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