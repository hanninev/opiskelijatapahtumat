import React from 'react'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-dom'

class TopMenu extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    return (
      <Redirect to='/' />
    )
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing secondary>
        <Menu.Menu position='right'>
        </Menu.Menu>
        <Menu.Item
          name='tapahtumat'
          active={activeItem === 'tapahtumat'}
          onClick={this.handleItemClick}
        >
          Tapahtumat
          </Menu.Item>
      </Menu>
    )
  }
}

const ConnectedEvents = connect(
  null,
  null
)(TopMenu)
export default ConnectedEvents

TopMenu.contextTypes = {
  store: PropTypes.object
}