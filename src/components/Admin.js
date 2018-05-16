import React from 'react'
import eventService from '../services/events'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import EventTypeList from './EventTypeList'
import EventType from './EventType'
import { connect } from 'react-redux'
import { selectionInitialization } from '../reducers/selectionReducer'

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
      this.props.selectionInitialization()
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    update = (eventTypeId) => async () => {
      const eventTypeObject = {
        text: this.state.text,
        searchAttributes: this.state.searchAttributes,
        dontShowIfTitleContains: this.state.dontShowIfTitleContains,
        dontShowEvents: this.state.dontShowEvents
      } 
      await eventService.updateEventType(eventTypeId, eventTypeObject)
      const eventTypes = await eventService.getEventTypes()
      this.setState({ eventTypes })
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
  selectionInitialization
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)