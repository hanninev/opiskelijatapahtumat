import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { organizerFilterCreation, organizerTypeFilterCreation, locationFilterCreation } from '../reducers/filterReducer'
import eventService from '../services/events'

class Filter extends React.Component {

  handleOrganizerChange = (event, { value }) => {
    console.log(value)
    this.props.organizerFilterCreation(value)
  }

  handleOTypeChange = (event, { value }) => {
    console.log(value)
    this.props.organizerTypeFilterCreation(value)
  }

  handleLocationChange = (event, { value }) => {
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

    const getLocations = async () => {
      const taulu = []
      const inObjects = taulu.map(p => {
        return { key: p, value: p, text: p }
      })
      return inObjects
    }

    return (
      <div>
        <Grid columns={3} stackable={true} stretched={true}>
          <Grid.Row>
            <Grid.Column>
              <Dropdown onChange={this.handleOrganizerChange} placeholder='Valitse järjestäjä' fluid multiple search closeOnChange selection options={getOrganizers()} />
            </Grid.Column>
            <Grid.Column>
              <Dropdown onChange={this.handleOTypeChange} placeholder='Valitse järjestäjän tyyppi' fluid multiple search closeOnChange selection options={getOrganizerTypes()} />
            </Grid.Column>
            <Grid.Column only='computer tablet'>
              <Dropdown onChange={this.handleLocationChange} placeholder='Valitse paikka' fluid multiple search closeOnChange selection options={getLocations()} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    organizers: state.organizers,
    calendar: state.calendar
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