import React from 'react'
import { Grid, List, Card, Container } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Day from './Day'
// import WeekNavigation from './WeekNavigation'
import { setCurrentWeek } from '../reducers/calendarReducer'

class Week extends React.Component {
  constructor({ props }) {
    super(props)
  }

  render() {
    const day = moment(this.props.date)
    const week = [0, 1, 2, 3, 4, 5, 6]
    const calendar = week.map(w => {
      return moment(day).add(w, 'd')
    })

    return (
      <Container>
        <Grid columns={1}>
          <Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Card.Group itemsPerRow='1'>
              {calendar.map(d =>
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
  setCurrentWeek
}

const ConnectedWeek = connect(
  mapStateToProps,
  mapDispatchToProps
)(Week)
export default ConnectedWeek

Week.contextTypes = {
  store: PropTypes.object
}