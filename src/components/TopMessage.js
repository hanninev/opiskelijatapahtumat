
import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class TopMessage extends React.Component {
    render() {
        const style = {
            borderColor: this.props.message.color,
            paddingLeft: 10,
            paddingRight: 10,
            borderStyle: 'solid',
            borderWidth: 5,
            borderRadius: 20,
          //  borderColor: 'white'
        }
        if (this.props.message.title !== '') {
            return (
                <Message style={style} visible={this.props.message.visible} color={this.props.message.color} header={this.props.message.title} list={this.props.message.message} />
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