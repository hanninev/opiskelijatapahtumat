import React from 'react'
import Events from './components/Events'
import { Container } from 'semantic-ui-react'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import TopMenu from './components/TopMenu'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <Container>
        <TopMenu />
        <Filter />
        <Router>
          <Route ecaxt path="/:view" render={({ match }) =>
            <Events view={(match.params.view)} />}
          />
        </Router>
      </Container>
    )
  }
}


export default connect(
  null,
  null
)(App)