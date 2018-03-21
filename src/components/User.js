import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userCreation } from '../reducers/userReducer'
import FacebookLogin from 'react-facebook-login'
import { Message } from 'semantic-ui-react'

class User extends React.Component {
  responseFacebook = (response) => {
    this.props.userCreation(response)
  }

  render() {
    return (
      <div><center>
        <Message small>
          <Message.Header>
            Tapahtumakalenterin käyttö edellyttää Facebook-kirjautumisen
          </Message.Header>
          <p>
            Sovellus pyytää lupaa käyttää julkista Facebook-profiiliasi.
          </p>
          <FacebookLogin
            appId="567551756946948"
            autoLoad={true}
            callback={this.responseFacebook} />
        </Message>
        <Message>
          <Message.Header>
            Opiskelijoiden tapahtumakalenteri?
          </Message.Header>
          <p>
            Sovellus hakee opiskelijajärjestöjen Facebook-sivuilta kaikki tapahtumat ja muodostaa niistä kalenterinäkymän. Näytettäviä tapahtumia voi filtteröidä mielensä mukaan. Mahdollisia filttereitä ovat esimerkiksi sitsit, approt, vuosijuhlat ja niin edes päin.
          </p>
        </Message>
      </center>
      </div>
    )
  }
}

const mapDispatchToProps = {
  userCreation
}

const ConnectedUser = connect(
  null,
  mapDispatchToProps
)(User)
export default ConnectedUser

User.contextTypes = {
  store: PropTypes.object
}