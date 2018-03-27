import React from 'react'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class TopMenu extends React.Component {

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Menu position='right'>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedEvents = connect(
  mapStateToProps,
  null
)(TopMenu)
export default ConnectedEvents

TopMenu.contextTypes = {
  store: PropTypes.object
}