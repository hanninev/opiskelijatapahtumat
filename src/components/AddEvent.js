import React from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Popup, Header, Button } from 'semantic-ui-react'
import { selectionInit, addNewOrganizer, addNewEventType, addNewLocation, setEventOrganizers, setEventEventTypes, setEventLocations } from '../reducers/selectionReducer'
import { setMessage } from '../reducers/messageReducer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import eventService from '../services/events'

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
            endDate: ''
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

        const errors = []
        if (this.state.newOrganizerName === undefined || this.state.newOrganizerName === '') {
            errors.push('Uuden järjestäjän nimi puuttuu')
        }
        if (this.state.newOrganizerType === undefined || this.state.newOrganizerType === '') {
            errors.push('Uuden järjestäjän tyyppi puuttuu')
        }
        if (errors.length !== 0) {
            this.props.setMessage('Virhe!', errors, 'red', 10)
        } else {
            this.props.setMessage('Uuden järjestäjän lisääminen onnistui!', '', 'green')
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
    }

    // EventType
    handleEventTypeChange(event, { value }) {
        this.props.setEventEventTypes(value)
    }

    handleNewEventTypeAdd(e) {
        e.preventDefault()

        const errors = []
        if (this.state.newEventTypeName === undefined || this.state.newEventTypeName === '') {
            errors.push('Uuden tapahtumatyypin nimi puuttuu')
        }
        if (errors.length !== 0) {
            this.props.setMessage('Virhe!', errors, 'red', 10)
        } else {
            this.props.setMessage('Uuden tapahtumatyypin lisääminen onnistui!', '', 'green')
            this.props.addNewEventType({
                name: this.state.newEventTypeName
            })
            this.setState({
                newEventTypeName: ''
            })
        }
    }

    // Location
    handleLocationChange(event, { value }) {
        this.props.setEventLocations(value)
    }

    handleNewLocationAdd(e) {
        e.preventDefault()

        const errors = []
        if (this.state.newLocationName === undefined || this.state.newLocationName === '') {
            errors.push('Uuden paikan nimi puuttuu')
        }
        if (this.state.newLocationAddress === undefined || this.state.newLocationAddress === '') {
            errors.push('Uuden paikan osoite puuttuu')
        }
        if (errors.length !== 0) {
            this.props.setMessage('Virhe!', errors, 'red', 10)
        } else {
            this.props.setMessage('Uuden paikan lisääminen onnistui!', '', 'green')
            this.props.addNewLocation({
                name: this.state.newLocationName,
                address: this.state.newLocationAddress
            })
            this.setState({
                newLocationName: '',
                newLocationAddress: ''
            })
        }
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

    async handleNewEventAdd(e) {
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

        try {
            const response = await eventService.createEvent(event)
            console.log(response)
            this.props.setMessage('Tapahtuman lisäys onnistui!', '', 'green')
            this.props.history.push('/')
        } catch (e) {
            const errors = []
            if (this.state.name === undefined || this.state.name === '') {
                errors.push('Tapahtuman nimi puuttuu')
            }
            if (this.state.description === undefined || this.state.description === '') {
                errors.push('Tapahtuman kuvaus puuttuu')
            }
            if (this.state.startDate === undefined || this.state.startDate === '') {
                errors.push('Tapahtuman alkamisaika puuttuu')
            }
            if (this.state.endDate === undefined || this.state.endDate === '') {
                errors.push('Tapahtuman päättymisaika puuttuu')
            }
            if (this.props.selections.newEvent_eventTypes.length === 0) {
                errors.push('Tapahtuman tyyppi puuttuu')
            }
            if (this.props.selections.newEvent_locations.length === 0) {
                errors.push('Tapahtuman sijainti puuttuu')
            }
            if (this.props.selections.newEvent_organizers.length === 0) {
                errors.push('Tapahtuman järjestäjä puuttuu')
            }
            if (errors.length === 0) {
                errors.push('Jotain meni pieleen!')
            }
            this.props.setMessage('Virhe!', errors, 'red', 10)
        }
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
                        <Popup trigger={<Button> Lisää uusi järjestäjä</Button>} flowing hoverable>
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
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
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
                            <Form.Button type='submit' onClick={this.handleNewEventAdd}>Lähetä</Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selections: state.selections,
        message: state.message
    }
}

const mapDispatchToProps = {
    selectionInit,
    setEventOrganizers,
    setEventEventTypes,
    setEventLocations,
    addNewOrganizer,
    addNewEventType,
    addNewLocation,
    setMessage
}

const ConnectedAddEvent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEvent)
export default ConnectedAddEvent
