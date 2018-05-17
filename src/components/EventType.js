import React from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import eventService from '../services/events'

class EventType extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      text: '',
      searchAttributes: [],
      dontShowIfTitleContains: [],
      dontShowEvents: []
    }
  }

componentWillMount = () => {
  this.setState({text: this.props.eventT.text,
    searchAttributes: this.props.eventT.searchAttributes,
    dontShowIfTitleContains: this.props.eventT.dontShowIfTitleContains,
    dontShowEvents: this.props.eventT.dontShowEvents})
}

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value.split(',') })
  }

  update = () => async () => {
    const eventTypeObject = {
      text: this.state.text,
      searchAttributes: this.state.searchAttributes,
      dontShowIfTitleContains: this.state.dontShowIfTitleContains,
      dontShowEvents: this.state.dontShowEvents
    } 
    await eventService.updateEventType(this.props.eventT._id, eventTypeObject)
  }

  render() {
    const { eventT } = this.props

    console.log(eventT)
    return (
      <div>
        Erottele sanat pilkulla
        <Form onSubmit={this.update()}>
          <Form.Group widths='equal'>
            <Form.Input fluid id='form-subcomponent-shorthand-input-first-name' onChange={this.handleChange} name='text' value={this.state.text} label='Tapahtuman tyyppi' placeholder='Event type' />
            <TextArea placeholder='Hakusanat otsikosta ja kuvauksesta' name='searchAttributes' onChange={this.handleChange} value={this.state.searchAttributes.toString()} />
            <TextArea placeholder='Älä näytä, jos otsikko sisältää nämä sanat' onChange={this.handleChange} name='dontShowIfTitleContains' value={this.state.dontShowIfTitleContains.toString()} />
            <TextArea placeholder='Kirjoita tapahtumien id:t, joita ei näytetä' onChange={this.handleChange} name='dontShowEvents' value={this.state.dontShowEvents.toString()} />
          </Form.Group>
          <Button type='submit'>Tallenna</Button>
        </Form>
      </div>
    )
  }
}

export default EventType