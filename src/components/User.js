import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userCreation } from '../reducers/userReducer'
import FacebookLogin from 'react-facebook-login'

class User extends React.Component {
  responseFacebook = (response) => {
    this.props.userCreation(response)
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="567551756946948"
          autoLoad={true}
          callback={this.responseFacebook} />
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