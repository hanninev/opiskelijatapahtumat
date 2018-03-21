import React from 'react'
import Events from './components/Events'
import { Container } from 'semantic-ui-react'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import TopMenu from './components/TopMenu'

class App extends React.Component {

  render() {
    return (
      <Container>
        <TopMenu />
        <Filter />
        <Events />
      </Container>
    )
  }
}


export default connect(
  null,
  null
)(App)