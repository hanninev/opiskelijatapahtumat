import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const LocationFilter = ( {places, handleLocation} ) => (
  <Dropdown onChange={handleLocation} placeholder='Valitse paikka' fluid multiple search closeOnChange selection options={places} />
)

export default LocationFilter
