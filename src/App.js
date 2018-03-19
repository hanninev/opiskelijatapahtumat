import React from 'react'
import Events from './components/Events'
import eventService from './services/events'
import userService from './services/user'
import { Container } from 'semantic-ui-react'
import Filter from './components/Filter'
import { organizerInitialization } from './reducers/organizerReducer'
import { userInitialization } from './reducers/userReducer'
import { eventInitialization } from './reducers/eventReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  componentDidMount = async () => {
    if (window.sessionStorage.getItem('user') !== null) {
    this.props.organizerInitialization()
    this.props.eventInitialization()
    }
    }

  render() {
    const token = window.sessionStorage.getItem('user')
    console.log(token)
    if (token !== null) {
      return (
        <Container>
        <Filter />
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
          <Events />
        </Container>
      )
    } else {
      return (
        <Container>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="true" data-auto-logout-link="true" data-use-continue-as="true"></div>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

export default connect(
  null,
  { organizerInitialization, eventInitialization, userInitialization }
)(App)