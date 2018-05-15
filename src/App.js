import React from 'react'
import { Container } from 'semantic-ui-react'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import TopMenu from './components/TopMenu'
import EventType from './components/EventType'
import EventTypeList from './components/EventTypeList'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import moment from 'moment'
import { selectionInitialization } from './reducers/selectionReducer'

class App extends React.Component {

  componentWillMount = () => {
    this.props.selectionInitialization()
  }

  render() {
    const lastMonday = moment().isoWeekday(1).format('YYYY-MM-DD')
    const redirectWeek = '/week/' + lastMonday

    const eventTypeById = (id) => {
      return this.props.selections.eventTypes.find(eventType => eventType._id === id)
    }

    return (
      <Container>
        <TopMenu />
        <Router>
          <div>
            <Route path="/week" render={({ location, history }) => {
              console.log(location)
              return <Filter location={location} history={history} />
            }} />
            <Route exact path="/" render={() => {
              return <Redirect to={redirectWeek} />
            }} />
            <Route exact path="/admin" render={() => {
              return <EventTypeList selections={this.props.selections} />
            }} />
            <Route exact path="/admin/:id" render={({ match }) =>
              <EventType eventT={eventTypeById(match.params.id)} />}
            />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selections: state.selections
  }
}

const mapDispatchToProps = {
  selectionInitialization
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)