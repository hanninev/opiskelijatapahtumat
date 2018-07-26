import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import EventTypeList from './EventTypeList'
import EventType from './EventType'
import { connect } from 'react-redux'

class Admin extends React.Component {
    constructor({ props }) {
        super(props)
        this.state = {
            text: '',
            searchAttributes: [],
            dontShowIfTitleContains: [],
            dontShowEvents: [],
            eventTypes: []
        }
    }

  componentWillMount = () => {
  }

  handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
  }

  render() {

      const eventTypeById = (id) => {
          return this.props.selections.eventTypes.find(eventType => eventType._id === id)
      }

      return (
          <Router>
              <div>
                  <Route exact path="/admin" render={() => {
                      return <EventTypeList selections={this.props.selections} />
                  }} />
                  <Route exact path="/admin/:id" render={({ match }) =>
                      <EventType update={this.update} handleChange={this.handleChange} eventT={eventTypeById(match.params.id)} />}
                  />
              </div>
          </Router>
      )
  }
}

const mapStateToProps = (state) => {
    return {
        selections: state.selections
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin)