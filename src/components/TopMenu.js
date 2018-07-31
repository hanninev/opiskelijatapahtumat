import React from 'react'
import { Menu, Button, Grid } from 'semantic-ui-react'
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
          <Button inverted color='yellow'>Ylläpito</Button>
        </Menu.Item>
      )
    }
  }

  mobileAdmin() {
    if (this.props.user.loggedIn !== null) {
      if (this.props.user.loggedIn.admin) {
        return (
          <div>
          <Button as={Link} to='/admin' inverted color='yellow'>Hallitse tapahtumia</Button>
          <Button as={Link} to='/logout' inverted color='yellow'>Kirjaudu ulos</Button>
          </div>
        )
      }
      return (
        <Button as={Link} to='/logout' inverted color='yellow'>Kirjaudu ulos</Button>
      )
    } else {
      return (
        <Button as={Link} to='/login' inverted color='yellow'>Ylläpito</Button>
      )
    }
  }

  render() {
    const style = {
      backgroundColor: '#333300'
    }

    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Row only='computer tablet'>
          <Menu pointing secondary style={style}>
            <Menu.Menu position='right'>
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
            </Menu.Menu>
          </Menu>
        </Grid.Row>
        <Grid.Row only='mobile' centered>
            {this.mobileAdmin()}
            <Button as={Link} to='/' inverted color='yellow'>Tapahtumat</Button>
            <Button as={Link} to='/addEvent' inverted color='yellow'>Ilmoita uusi tapahtuma</Button>
        </Grid.Row>
      </Grid>
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