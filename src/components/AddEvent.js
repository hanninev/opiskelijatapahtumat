import React from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Popup, Header, Button } from 'semantic-ui-react'
import { selectionInit, addNewOrganizer, addNewEventType, addNewLocation, setEventOrganizers, setEventEventTypes, setEventLocations } from '../reducers/selectionReducer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class AddEvent extends React.Component {
    constructor({ props }) {
        super(props)
        this.state = {
            name: '',
            descriptipn: '',
            newOrganizerName: '',
            newOrganizerFaculty: '',
            newOrganizerType: '',
            newEventTypeName: '',
            newLocationName: '',
            newLocationAddress: '',
            startDate: moment(),
            endDate: moment()
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
        this.props.addNewOrganizer({
            name: this.state.newEventTypeName,
        })
        this.setState({
            newEventTypeName: '',
        })
    }

    // Location
    handleLocationChange(event, { value }) {
        this.props.setEventLocations(value)
    }

    handleNewLocationAdd(e) {
        e.preventDefault()
        this.props.addNewOrganizer({
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


    timeForm(label, handler) {
        return (
            <div>
                <Form.Field label={label} />
                <DatePicker
                    selected={this.state.startDate}
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

    popUpSelection(options, handler, value, label, header, fields, multiple) {
        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Dropdown label={label} onChange={handler} value={value} fluid multiple={multiple} search closeOnChange selection options={options} />
                    </Grid.Column>
                    <Grid.Column>
                        <br />
                        <Popup trigger={<Button>{header}</Button>} flowing hoverable>
                            <Header as='h4'>{header}</Header>
                            <Form>
                                {fields.map((field, key) => {
                                    return (
                                        <Form.Input key={key} fluid label={field} placeholder={field} />
                                    )
                                })}
                                <Form.Button>Lisää</Form.Button>
                            </Form>
                        </Popup>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    popUpOrganizer(options) {
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
                        <Form.Dropdown label='Valitse järjestäjät' onChange={this.handleOrganizerChange} value={this.props.selections.newEvent_organizers} fluid multiple search closeOnChange selection options={options} />
                    </Grid.Column>
                    <Grid.Column>
                        <br />
                        <Popup trigger={<Button>Lisää uusi järjestäjä</Button>} flowing hoverable>
                            <Header as='h4'>Lisää uusi järjestäjä</Header>
                            <Form onSubmit={this.handleOrganizerAdd}>
                                <Form.Input fluid label='Nimi' value={this.state.newOrganizerName} name='organizerName' onChange={this.handleChange} placeholder='Nimi' />
                                <Form.Select label='Tyyppi' name='organizerType' value={this.state.newOrganizerType} onChange={this.handleDropDownChange} fluid search closeOnChange selection options={getOrganizerTypes()} />
                                <Form.Select label='Tiedekunta' name='organizerFaculty' value={this.state.newOrganizerFaculty} onChange={this.handleDropDownChange} fluid search closeOnChange selection options={getFaculties()} />
                                <Form.Button type='submit'>Lisää</Form.Button>
                            </Form>
                        </Popup>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    render() {
        const getEventTypes = () => {
            const inObjects = this.props.selections.eventTypes.map(e => {
                return { key: e.id, value: e, text: e.name }
            })
            return inObjects
        }

        const getOrganizers = () => {
            const inObjects = this.props.selections.organizers.map(e => {
                return { key: e.id, value: e, text: e.name }
            })
            return inObjects
        }

        const getLocations = () => {
            const inObjects = this.props.selections.locations.map(e => {
                return { key: e.id, value: e, text: e.name }
            })
            return inObjects
        }

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Tapahtuman nimi' name="name" placeholder='Tapahtuman nimi' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Grid columns={2} stackable={true} stretched={true}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            {this.timeForm('Alkamisaika', this.handleStartDateChange)}
                                        </Grid.Column>
                                        <Grid.Column>
                                            {this.timeForm('Päättymisaika', this.handleEndDateChange)}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form.Group>
                            {this.popUpSelection(getEventTypes(), this.handleEventTypeChange, this.props.selections.newEvent_eventTypes, 'Valitse tapahtumatyypit', 'Lisää uusi tapahtumatyyppi', ['Nimi'], true)}
                            {this.popUpOrganizer(getOrganizers())}
                            {this.popUpSelection(getLocations(), this.handleLocationChange, this.props.selections.newEvent_locations, 'Valitse paikka', 'Lisää uusi paikka', ['Nimi', 'Osoite'], false)}

                            <Form.TextArea label='Kuvaus' placeholder='Kuvaus' />
                            <Form.Button>Lähetä</Form.Button>
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
