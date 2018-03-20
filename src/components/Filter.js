import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { organizerFilterCreation, organizerTypeFilterCreation, locationFilterCreation } from '../reducers/filterReducer'

class Filter extends React.Component {

  handleOrganizerChange = (event, { value }) => {
    console.log(value)
    this.props.organizerFilterCreation(value)
  }

  handleOTypeChange = (event, { value }) => {
    console.log(value)
    this.props.organizerTypeFilterCreation(value)
  }

  handleLocationChange = (e, { value }) => {
    console.log(value)
    this.props.locationFilterCreation(value)
  }

  render() {
    const getOrganizers = () => {
      const inObjects = this.props.organizers.map(p => {
        return { key: p.fbpage_id, value: p.name, text: p.name }
      })
      console.log(inObjects)
      return inObjects
    }

    const getOrganizerTypes = () => {
      const types = this.props.organizers.map(organizer => {
        return organizer.type
      })
      const withoutDuplicates = Array.from(new Set(types))
      const inObjects = withoutDuplicates.map(p => {
        return { key: p, value: p, text: p }
      })
      return inObjects
    }

    const getLocations = () => {
      const locations = this.props.events.map(e => {
        if (e.place !== undefined) {
          return e.place.name
        }
      })
      const withoutUndefined = locations.filter(p => p !== undefined)
      const withoutDuplicates = Array.from(new Set(withoutUndefined))
      const inObjects = withoutDuplicates.map(p => {
        return { key: p, value: p, text: p }
      })
      return inObjects
    }

    return (
      <div>
        <Dropdown onChange={this.handleOrganizerChange} placeholder='Valitse järjestäjä' fluid multiple search closeOnChange selection options={getOrganizers()} />
        <Dropdown onChange={this.handleOTypeChange} placeholder='Valitse järjestäjän tyyppi' fluid multiple search closeOnChange selection options={getOrganizerTypes()} />
        <Dropdown onChange={this.handleLocationChange} placeholder='Valitse paikka' fluid multiple search closeOnChange selection options={getLocations()} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    organizers: state.organizers,
    events: state.events
  }
}

const mapDispatchToProps = {
  organizerFilterCreation,
  organizerTypeFilterCreation,
  locationFilterCreation
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
export default ConnectedFilter

Filter.contextTypes = {
  store: PropTypes.object
}