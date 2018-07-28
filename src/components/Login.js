import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'
import loginService from '../services/login'
import { setMessage } from '../reducers/messageReducer'

class Login extends React.Component {
    constructor({ props }) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async () => {
        try {
            const loggedIn = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
            console.log(loggedIn)
           this.props.login(loggedIn.data)
           this.props.history.push('/')
           this.props.setMessage('Kirjautuminen onnistui!', ['Tervetuloa, ' + this.props.user.loggedIn.username], 'green')
        } catch (error) {
            this.props.setMessage('Virhe!', ['Väärä käyttäjätunnus tai salasana'], 'red')
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input label='Käyttäjätunnus' name='username' onChange={this.handleChange} type='username' />
                <Form.Input label='Salasana' name='password' onChange={this.handleChange} type='password' />
                <Button type='submit'>Kirjaudu</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    login,
    setMessage
}

const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
export default ConnectedLogin
