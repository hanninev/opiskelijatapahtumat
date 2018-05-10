import React from 'react'
import { Button, Icon, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Week from './Week'
import moment from 'moment'

class WeekNavigation extends React.Component {
  render() {
    const previousWeek = moment(this.props.calendar.days[0]).add(-7, 'd').format('YYYY-MM-DD')
    const nextWeek = moment(this.props.calendar.days[6]).add(1, 'd').format('YYYY-MM-DD')
    const currentWeek = moment().format('YYYY-MM-DD')

    return (
      <Router>
        <Grid columns={3} stretched={true} centered={true}>
          <Grid.Row only='computer tablet'>
            <Grid.Column>
              <Link to={`/week/${previousWeek}` + this.props.location.search}><Button icon labelPosition='left'>
                <Icon name='left arrow' />
                Edellinen
              </Button></Link>
            </Grid.Column>
            <Grid.Column>
              <Link to={`/week/${currentWeek}` + this.props.location.search}><Button>
                Nykyinen viikko
              </Button></Link>
            </Grid.Column>
            <Grid.Column>
              <Link to={`/week/${nextWeek}` + this.props.location.search}><Button icon labelPosition='right'>
                Seuraava
                <Icon name='right arrow' />
              </Button></Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stackable={true} only='mobile'>
            <Button icon>
              <Icon name='left arrow' />
            </Button>
            <Button>
              Nykyinen viikko
            </Button>
            <Button icon>
              <Icon name='right arrow' />
            </Button>
          </Grid.Row>

          <Route exact path="/week/:date" render={({ match, location }) => {
            console.log(location)
            window.sessionStorage.setItem('searchParams', location.search)
            return <Week key={match.params.date} getEvents={this.props.getEvents} date={match.params.date} />
          }}
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

const ConnectedEvents = connect(
  mapStateToProps,
  null
)(WeekNavigation)
export default ConnectedEvents

WeekNavigation.contextTypes = {
  store: PropTypes.object
}