import React from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Popup, Header, Button } from 'semantic-ui-react'
import { selectionInit, addNewOrganizer, addNewEventType, addNewLocation, setEventOrganizers, setEventEventTypes, setEventLocations } from '../reducers/selectionReducer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import eventService from '../services/events'
import Redirect from 'react-dom'

class AddEvent extends React.Component {
    constructor({ props }) {
        super(props)
        this.state = {
            name: '',
            description: '',
            newOrganizerName: '',
            newOrganizerFaculty: '',
            newOrganizerType: '',
            newEventTypeName: '',
            newLocationName: '',
            newLocationAddress: '',
            startDate: '',
            endDate: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleDropDownChange = this.handleDropDownChange.bind(this)
        this.handleOrganizerChange = this.handleOrganizerChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this)
        this.handleNewOrganizerAdd = this.handleNewOrganizerAdd.bind(this)
        this.handleNewLocationAdd = this.handleNewLocationAdd.bind(this)
        this.handleNewEventTypeAdd = this.handleNewEventTypeAdd.bind(this)
        this.handleNewEventAdd = this.handleNewEventAdd.bind(this)
    }

    // Organizer
    handleOrganizerChange(event, { value }) {
        this.props.setEventOrganizers(value)
    }

    handleNewOrganizerAdd(e) {
        e.preventDefault()
        this.props.addNewOrganizer({
            name: this.state.newOrganizerName,
            organizer_type: this.state.newOrganizerType,
            faculty: this.state.newOrganizerFaculty
        })
        this.setState({
            newOrganizerName: '',
            newOrganizerType: '',
            newOrganizerFaculty: ''
        })
    }

    // EventType
    handleEventTypeChange(event, { value }) {
        this.props.setEventEventTypes(value)
    }

    handleNewEventTypeAdd(e) {
        e.preventDefault()
        this.props.addNewEventType({
            name: this.state.newEventTypeName
        })
        this.setState({
            newEventTypeName: ''
        })
    }

    // Location
    handleLocationChange(event, { value }) {
        this.props.setEventLocations(value)
    }

    handleNewLocationAdd(e) {
        e.preventDefault()
        this.props.addNewLocation({
            name: this.state.newLocationName,
            address: this.state.newLocationAddress
        })
        this.setState({
            newLocationName: '',
            newLocationAddress: ''
        })
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        })
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state)
    }

    handleDropDownChange(event, { name, value }) {
        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleNewEventAdd(e) {
        e.preventDefault()
        const event = {
            name: this.state.name,
            description: this.state.description,
            start_time: this.state.startDate,
            end_time: this.state.endDate,
            eventTypes: this.props.selections.newEvent_eventTypes.map(e => e.id),
            locations: this.props.selections.newEvent_locations.map(e => e.id),
            organizers: this.props.selections.newEvent_organizers.map(e => e.id)
        }

        eventService.createEvent(event)
        this.setState({redirect: true})
    }


    timeForm(label, selected, handler) {
        return (
            <div>
                <Form.Field label={label} />
                <DatePicker
                    selected={selected}
                    onChange={handler}
                    locale="en-gb"
                    //  showTimeSelect
                    timeFormat="HH:mm"
                    injectTimes={[
                        moment().hours(0).minutes(1),
                        moment().hours(12).minutes(5),
                        moment().hours(23).minutes(59)
                    ]}
                    dateFormat="DD.MM.YYYY HH:MM"
                />
            </div>
        )
    }

    popUpEventType() {
        const getEventTypes = () => {
            const inObjects = this.props.selections.eventTypes.map(e => {
                return { key: e.id, value: e, text: e.name }
            })
            return inObjects
        }

        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Dropdown label='Valitse tapahtumatyyppi' onChange={this.handleEventTypeChange} value={this.props.selections.newEvent_eventTypes} fluid multiple search closeOnChange selection options={getEventTypes()} />
                    </Grid.Column>
                    <Grid.Column>
                        <br />
                        <Popup trigger={<Button>Lisää uusi tapahtumatyyppi</Button>} flowing hoverable>
                            <Header as='h4'>Lisää uusi tapahtumatyyppi</Header>
                            <Form onSubmit={this.handleNewEventTypeAdd}>
                                <Form.Input onChange={this.handleChange} name='newEventTypeName' fluid label='Nimi' placeholder='Nimi' />
                                <Form.Button type='submit'>Lisää</Form.Button>
                            </Form>
                        </Popup>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    popUpLocation() {
        const getLocations = () => {
            const inObjects = this.props.selections.locations.map(e => {
                return { key: e.id, value: e, text: e.name }
            })
            return inObjects
        }

        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Dropdown label={'Valitse paikka'} onChange={this.handleLocationChange} value={this.props.selections.newEvent_locations} fluid multiple search closeOnChange selection options={getLocations()} />
                    </Grid.Column>
                    <Grid.Column>
                        <br />
                        <Popup trigger={<Button>Lisää uusi paikka</Button>} flowing hoverable>
                            <Header as='h4'>Lisää uusi paikka</Header>
                            <Form onSubmit={this.handleNewLocationAdd}>
                                <Form.Input onChange={this.handleChange} name='newLocationName' fluid label='Nimi' placeholder='Nimi' />
                                <Form.Input onChange={this.handleChange} name='newLocationAddress' fluid label='Osoite' placeholder='Osoite' />
                                <Form.Button type='submit'>Lisää</Form.Button>
                            </Form>
                        </Popup>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }


    popUpOrganizer() {
        const getOrganizers = () => {
            const inObjects = this.props.selections.organizers.map(e => {
                return { key: e.id, value: e, text: e.name }
            })
            return inObjects
        }

        const getOrganizerTypes = () => {
            const organizerTypes = ['Tiedekunta- ja ainejärjestöt', 'Osakunnat', 'Muut']
            const inObjects = organizerTypes.map(e => {
                return { key: organizerTypes.indexOf(e), value: e, text: e }
            })
            return inObjects
        }

        const getFaculties = () => {
            const faculties = ['Matemaattis-luonnontieteellinen tiedekunta', 'Humanistinen tiedekunta']
            const inObjects = faculties.map(e => {
                return { key: faculties.indexOf(e), value: e, text: e }
            })
            return inObjects
        }

        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Dropdown label='Valitse järjestäjät' onChange={this.handleOrganizerChange} value={this.props.selections.newEvent_organizers} fluid multiple search closeOnChange selection options={getOrganizers()} />
                    </Grid.Column>
                    <Grid.Column>
                        <br />
                        <Popup trigger={<Button>Lisää uusi järjestäjä</Button>} flowing hoverable>
                            <Header as='h4'>Lisää uusi järjestäjä</Header>
                            <Form onSubmit={this.handleNewOrganizerAdd}>
                                <Form.Input fluid label='Nimi' value={this.state.newOrganizerName} name='newOrganizerName' onChange={this.handleChange} placeholder='Nimi' />
                                <Form.Select label='Tyyppi' name='newOrganizerType' value={this.state.newOrganizerType} onChange={this.handleDropDownChange} fluid search closeOnChange selection options={getOrganizerTypes()} />
                                <Form.Select label='Tiedekunta' name='newOrganizerFaculty' value={this.state.newOrganizerFaculty} onChange={this.handleDropDownChange} fluid search closeOnChange selection options={getFaculties()} />
                                <Form.Button type='submit'>Lisää</Form.Button>
                            </Form>
                        </Popup>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/week' />
        }
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Form onSubmit={this.handleNewEventAdd}>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Tapahtuman nimi' name='name' value={this.state.name} onChange={this.handleChange} placeholder='Tapahtuman nimi' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Grid columns={2} stackable={true} stretched={true}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            {this.timeForm('Alkamisaika', this.state.startDate, this.handleStartDateChange)}
                                        </Grid.Column>
                                        <Grid.Column>
                                            {this.timeForm('Päättymisaika', this.state.endDate, this.handleEndDateChange)}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form.Group>
                            {this.popUpEventType()}
                            {this.popUpOrganizer()}
                            {this.popUpLocation()}
                            <Form.TextArea label='Kuvaus' name='description' value={this.state.description} onChange={this.handleChange} placeholder='Kuvaus' />
                            <Form.Button type='submit'>Lähetä</Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selections: state.selections
    }
}

const mapDispatchToProps = {
    selectionInit,
    setEventOrganizers,
    setEventEventTypes,
    setEventLocations,
    addNewOrganizer,
    addNewEventType,
    addNewLocation
}

const ConnectedAddEvent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEvent)
export default ConnectedAddEvent
