
import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class TopMessage extends React.Component {
    render() {
        if (this.props.message.title !== '') {
            return (
                <Message visible={this.props.message.visible} color={this.props.message.color} header={this.props.message.title} list={this.props.message.message} />
            )
        } else {
            return <div></div>
        }
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

const ConnectedTopMessage = connect(
    mapStateToProps,
    null
)(TopMessage)
export default ConnectedTopMessage