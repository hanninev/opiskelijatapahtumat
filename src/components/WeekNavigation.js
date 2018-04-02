import React from 'react'
import { Button, Icon, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNextWeek, setPreviousWeek, setCurrentWeek } from '../reducers/calendarReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Week from './Week'
import eventService from '../services/events'
import moment from 'moment'

class WeekNavigation extends React.Component {
  render() {
    return (
      <Router>
        <Grid columns={3} stretched={true} centered={true}>
          <Grid.Row only='computer tablet'>
            <Grid.Column>
              <Link to={'/week/2017-03-02'}>edell</Link>

              <Button onClick={() => this.props.setPreviousWeek(this.props.calendar.days)} icon labelPosition='left'>
                <Icon name='left arrow' />
                Edellinen
            </Button>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={() => this.props.setCurrentWeek(this.props.calendar.days)}>
                Nykyinen viikko
            </Button>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={() => this.props.setNextWeek(this.props.calendar.days)} icon labelPosition='right'>
                Seuraava
              <Icon name='right arrow' />
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stackable={true} only='mobile'>
            <Button onClick={() => this.props.setPreviousWeek(this.props.calendar.days)} icon>
              <Icon name='left arrow' />
            </Button>
            <Button onClick={() => this.props.setCurrentWeek()}>
              Nykyinen viikko
          </Button>
            <Button onClick={() => this.props.setNextWeek(this.props.calendar.days)} icon>
              <Icon name='right arrow' />
            </Button>
          </Grid.Row>
          <Route exact path="/week/:date" render={({ match }) => {
            const day = moment(this.props.date)
            const week = [0, 1, 2, 3, 4, 5, 6]
            const calendar = week.map(w => {
              return moment(day).add(w, 'd')
            })
            this.props.setCurrentWeek(calendar)
            return <Week getEvents={this.props.getEvents} date={match.params.date} />
          }} // filtterit kaiken ylimpänä?
          />
        </Grid>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar
  }
}

const mapDispatchToProps = {
  setNextWeek,
  setPreviousWeek,
  setCurrentWeek
}

const ConnectedEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekNavigation)
export default ConnectedEvents

WeekNavigation.contextTypes = {
  store: PropTypes.object
}