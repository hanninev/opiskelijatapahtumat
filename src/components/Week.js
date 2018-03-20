import React from 'react'
import { Grid, List, Card, Container } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Day from './Day'
import WeekNavigation from './WeekNavigation'

class Week extends React.Component {
  constructor({ props }) {
    super(props)
  }

  render() {
    return (
      <Container>
        <WeekNavigation />
        <Card.Group itemsPerRow='1'>
          {this.props.calendar.week.map(d =>
            <Card key={d}>
              <Card.Content header={moment().day(d).format('dddd DD.MM.YYYY')} />
              <Card.Content>
                <List divided relaxed>
                  {this.props.getEvents(moment().day(d).format()).map((e, i) =>
                    <Day key={i} e={e} i={i} />
                  )}
                </List>
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar
  }
}

const ConnectedEvents = connect(
  mapStateToProps,
  null
)(Week)
export default ConnectedEvents

Week.contextTypes = {
  store: PropTypes.object
}