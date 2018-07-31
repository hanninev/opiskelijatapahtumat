import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class TopMenu extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  admin() {
    const { activeItem } = this.state

    if (this.props.user.loggedIn !== null) {
      if (this.props.user.loggedIn.admin) {
        return (
          <Menu.Item
            as={Link} to='/admin'
            name='admin'
            active={activeItem === 'admin'}
            onClick={this.handleItemClick}
          >
            <Button inverted color='yellow'>Hallitse tapahtumia</Button>
        </Menu.Item>
        )
      }
    } else {
      return (
        <div></div>
      )
    }
  }

  logIn() {
    const { activeItem } = this.state

    if (this.props.user.loggedIn !== null) {
      return (
        <Menu.Item
          as={Link} to='/logout'
          name='ulos'
          active={activeItem === 'ulos'}
          onClick={this.handleItemClick}
        >
          <Button inverted color='yellow'>Kirjaudu ulos</Button>
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item
          as={Link} to='/login'
          name='sisään'
          active={activeItem === 'sisään'}
          onClick={this.handleItemClick}
        >
          <Button inverted color='yellow'>Kirjaudu sisään</Button>
        </Menu.Item>
      )
    }
  }

  render() {
    const style = {
      backgroundColor: '#333300'
    }

    const { activeItem } = this.state

    return (
      <Menu pointing secondary style={style}>
        <Menu.Menu position='right'>
        </Menu.Menu>
        {this.admin()}
        <Menu.Item
          as={Link} to='/'
          name='tapahtumat'
          active={activeItem === 'tapahtumat'}
          onClick={this.handleItemClick}
        >
          <Button inverted color='yellow'>Tapahtumat</Button>
          </Menu.Item>
        <Menu.Item
          as={Link} to='/addEvent'
          name='uusi'
          active={activeItem === 'uusi'}
          onClick={this.handleItemClick}
        >
          <Button inverted color='yellow'>Ilmoita uusi tapahtuma</Button>
          </Menu.Item>
          {this.logIn()}
      </Menu>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const ConnectedTopMenu = connect(
  mapStateToProps,
  null
)(TopMenu)
export default ConnectedTopMenu


TopMenu.contextTypes = {
  store: PropTypes.object
}