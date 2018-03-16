import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const OrganizerFilter = ( {organizer, handleOrganizer} ) => (
  <Dropdown onChange={handleOrganizer} placeholder='Valitse järjestäjä' fluid multiple search closeOnChange selection options={organizer} />
)

export default OrganizerFilter
