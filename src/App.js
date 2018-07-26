import React from 'react'
import { Container } from 'semantic-ui-react'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import TopMenu from './components/TopMenu'
import Admin from './components/Admin'
import AddEvent from './components/AddEvent'
import { selectionInit } from './reducers/selectionReducer'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import moment from 'moment'

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
        <TopMenu />
        <BrowserRouter>
          <Switch>
            <div>
              <Route path="/week" render={({ location, history }) => {
                console.log(location)
                return <Filter location={location} history={history} />
              }} />
              <Route exact path="/" render={() => {
                return <Redirect to={redirectWeek} />
              }} />
              <Route exact path="/admin" render={() => {
                return <Admin selections={this.props.selections} />
              }} />
              <Route exact path="/addEvent" render={() => {
                return <AddEvent />
              }} />
            </div>
          </Switch>
        </BrowserRouter>
      </Container>
    )
  }
}

const mapDispatchToProps = {
  selectionInit
}

const ConnectedApp = connect(
  null,
  mapDispatchToProps
)(App)
export default ConnectedApp
