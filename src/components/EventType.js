import React from 'react'
import { Form, TextArea } from 'semantic-ui-react'

class EventType extends React.Component {
  constructor({ props }) {
    super(props)
  }

  handleChange = (event, { value }) => {
    console.log(value)
 
  }

  render() {
    const { eventT } = this.props

      console.log(eventT)
    return (
        <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid id='form-subcomponent-shorthand-input-first-name' defaultValue={eventT.text} label='Event type' placeholder='Event type' />
          <TextArea placeholder='Lisää hakusanoja' defaultValue={eventT.searchAttributes} />
          <TextArea placeholder='Älä sisällytä, jos otsikko sisältää nämä sanat' defaultValue={eventT.dontShowIfTitleContains} />
          <TextArea placeholder='Älä sisällytä näitä tapahtumia' defaultValue={eventT.dontShowEvents} />
        </Form.Group>
      </Form>
    )}
}

export default EventType