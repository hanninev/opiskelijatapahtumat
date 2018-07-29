import React from 'react'
import { Container } from 'semantic-ui-react'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import TopMenu from './components/TopMenu'
import AddEvent from './components/AddEvent'
import { selectionInit, setEventEventTypes } from './reducers/selectionReducer'
import { logout } from './reducers/userReducer'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import moment from 'moment'
import TopMessage from './components/TopMessage'
import Login from './components/Login'
import WaitingForAcception from './components/WaitingForAcception'

class App extends React.Component {

  componentWillMount = async () => {
    console.log('app will mount')
    await this.props.selectionInit()
  }

  render() {
    const lastMonday = moment().isoWeekday(1).format('YYYY-MM-DD')
    const redirectWeek = '/week/' + lastMonday

    return (
      <Container>
        <BrowserRouter>
          <div>
            <TopMenu />
            <TopMessage />
            <Route path="/week" render={({ location, history }) => {
              console.log(location)
              return <Filter location={location} history={history} />
            }} />
            <Route exact path="/" render={() => {
              return <Redirect to={redirectWeek} />
            }} />
            <Route exact path="/admin" render={({ location, history }) => {
              if (this.props.user.loggedIn !== null && this.props.user.loggedIn.admin) {
                return <WaitingForAcception location={location} history={history} />
              } else {
                return <Redirect to={redirectWeek} />
              }
            }} />
            <Route exact path="/addEvent" render={({ location, history }) => {
              return <AddEvent location={location} history={history} />
            }} />
            <Route exact path="/login" render={({ location, history }) => {
              return <Login location={location} history={history} />
            }} />
            <Route exact path="/logout" render={() => {
              this.props.logout()
              return <Redirect to={redirectWeek} />
            }} />
          </div>
        </BrowserRouter>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    user: state.user,
    calendar: state.calendar
  }
}

const mapDispatchToProps = {
  selectionInit,
  logout,
  setEventEventTypes
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default ConnectedApp
