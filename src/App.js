import React from 'react'
import Events from './components/Events'
import User from './components/User'
import eventService from './services/events'
import { Container, Message } from 'semantic-ui-react'
import Filter from './components/Filter'
import { organizerInitialization } from './reducers/organizerReducer'
import { userInitialization } from './reducers/userReducer'
import { eventInitialization } from './reducers/eventReducer'
import { connect } from 'react-redux'

class App extends React.Component {

  render() {
    const token = window.sessionStorage.getItem('user')
    console.log(this.props.user)
    if (this.props.user.length === 0) {
      return (
        <Container>
        <User />
        </Container>
      )
    } else {
      return (
        <Container>
        <Filter />
        <Events />
        </Container> 
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { organizerInitialization, eventInitialization }
)(App)