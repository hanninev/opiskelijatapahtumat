import React from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Popup, Header, Button, Dropdown } from 'semantic-ui-react'
import { selectionInitialization } from '../reducers/selectionReducer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class AddEvent extends React.Component {
    constructor({ props }) {
        super(props)
        this.state = {
            startDate: moment()
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Tapahtuman nimi' placeholder='Tapahtuman nimi' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field label='Alkamisaika' />
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    locale="en-gb"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    injectTimes={[
                                        moment().hours(0).minutes(1),
                                        moment().hours(12).minutes(5),
                                        moment().hours(23).minutes(59)
                                    ]}
                                    dateFormat="DD.MM.YYYY HH:MM"
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field label='Päättymisaika' />
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    locale="en-gb"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    injectTimes={[
                                        moment().hours(0).minutes(1),
                                        moment().hours(12).minutes(5),
                                        moment().hours(23).minutes(59)
                                    ]}
                                    dateFormat="DD.MM.YYYY HH:MM"
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Form.Group>
                    <Dropdown onChange={this.handleChange} fluid multiple search closeOnChange selection options={'dw'} />
                    <Popup trigger={<Button>Lisää uusi tapahtumatyyppi</Button>} flowing hoverable>
                        <Header as='h4'>Lisää uusi tapahtumatyyppi</Header>
                        <Form>
                        <Form.Group widths='equal'>
                        <Form.Input fluid label='' placeholder='Tapahtumatyyppi' />
                    </Form.Group>
                    <Form.Button>Lisää</Form.Button>
                    </Form>
                    </Popup>
                    <Form.TextArea label='Tapahtuman kuvaus' placeholder='Tapahtuman kuvaus' />
                    <Form.Button>Lähetä</Form.Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selections: state.selections
    }
}

const mapDispatchToProps = {
    selectionInitialization
}

const ConnectedAddEvent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEvent)
export default ConnectedAddEvent
