import React from 'react'
import { Button, Icon, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Week from './Week'
import moment from 'moment'

class WeekNavigation extends React.Component {
  render() {
    const previousWeek = moment(this.props.calendar.days[0]).add(-7, 'd').format('YYYY-MM-DD')
    const nextWeek = moment(this.props.calendar.days[6]).add(1, 'd').format('YYYY-MM-DD')
    const currentWeek = moment().isoWeekday(1).format('YYYY-MM-DD')
    const style = {
      backgroundColor: '#333300',
      paddingLeft: 10,
      paddingRight: 10,
      borderStyle: 'solid',
      borderWidth: 20,
      borderRadius: 30,
      borderColor: 'white'
    }
    const mobileBtnStyle = {
      backgroundColor: '#333300',
      color: 'yellow'
    }
    return (
      <Router>
        <Grid columns={3} stretched={true} centered={true}>
          <Grid.Row only='computer tablet' style={style}>
            <Grid.Column>
              <Link to={`/week/${previousWeek}` + this.props.location.search}><Button inverted color='yellow' icon labelPosition='left'>
                <Icon name='left arrow' />
                Edellinen
              </Button></Link>
            </Grid.Column>
            <Grid.Column textAlign={'center'}>
              <Link to={`/week/${currentWeek}` + this.props.location.search}><Button inverted color='yellow'>
                Nykyinen viikko
              </Button></Link>
            </Grid.Column>
            <Grid.Column textAlign={'right'}>
              <Link to={`/week/${nextWeek}` + this.props.location.search}><Button inverted color='yellow' icon labelPosition='right'>
                Seuraava
                <Icon name='right arrow' />
              </Button></Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stackable="true" only='mobile'>
            <Link to={`/week/${previousWeek}` + this.props.location.search}><Button style={mobileBtnStyle} icon>
              <Icon name='left arrow' />
            </Button></Link>
            <Link to={`/week/${currentWeek}` + this.props.location.search}>
              <Button style={mobileBtnStyle}>
                Nykyinen viikko
              </Button></Link>
            <Link to={`/week/${nextWeek}` + this.props.location.search}><Button style={mobileBtnStyle} icon>
              <Icon name='right arrow' />
            </Button></Link>
          </Grid.Row>

          <Route exact path="/week/:date" render={({ match, location }) => {
            window.sessionStorage.setItem('searchParams', location.search)
            return <Week key={match.params.date} history={this.props.history} location={this.props.location} getEvents={this.props.getEvents} date={match.params.date} />
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