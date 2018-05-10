import React from 'react'
import Events from './components/Events'
import { Container } from 'semantic-ui-react'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import TopMenu from './components/TopMenu'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import moment from 'moment'

class App extends React.Component {

  render() {

    return (
      <Container>
        <TopMenu />
        <Router>
          <div>
            <Route path="/" render={({ location, history }) => {
              return <Filter location={location} history={history} />
            }} /> 
          </div>
        </Router>
      </Container>
    )
  }
}


export default connect(
  null,
  null
)(App)