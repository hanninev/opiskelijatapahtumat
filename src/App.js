import React from 'react'
import FacebookLoginButton from './components/FacebookLoginButton'
import Events from './components/Events'
import eventService from './services/events'
import userService from './services/user'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      events: []
    }
  }

  componentDidMount = () => {
    try {
    userService.getUser().then(response => {
      this.setState({ username: response.data.name })
    })  

    eventService.getAll().then(response => {
      this.setState({ events: response })
    })  
    } catch (exception) {
      console.log(exception)
    }
    }

  render() {
    const token = window.localStorage.getItem('user')
    console.log(token)
    if (this.state.username === null) {
      return (
        <div>
          <FacebookLoginButton />
        </div>
      )
    } else {
      return (
        <div>
          kl
          <Events event={this.state.events} />
        </div>
      )
    }
  }
}

export default App