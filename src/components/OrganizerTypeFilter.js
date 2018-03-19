import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const OrganizerTypeFilter = ( {organizerType, handleOrganizerType} ) => (
  <Dropdown onChange={handleOrganizerType} placeholder='Valitse järjestäjän tyyppi' fluid multiple search closeOnChange selection options={organizerType} />
)

export default OrganizerTypeFilter
