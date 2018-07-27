const initialState = {
    message: {
        title: '',
        message: '',
        color: '',
        visible: false
    }
}

const messageReducer = (store = initialState.message, action) => {
    console.log(action.type)
    if (action.type === 'SET_MESSAGE') {
        console.log(action)
        return { ...store, title: action.title, message: action.message, color: action.color, visible: action.visible }
    }
    return store
}

export const setMessage = (title, message, color, time) => {
    if (time === undefined) {
        time = 7
    }
    if (color === undefined) {
        color = 'teal'
    }

    return async (dispatch) => {
        dispatch(setMessageValues(title, message, color, true))
        setTimeout(() => {
            dispatch(setMessageValues('', '', '', false))
        }, 1000 * time)
    }
}

const setMessageValues = (title, message, color, visible) => {
    return {
        type: 'SET_MESSAGE',
        title: title,
        message: message,
        color: color,
        visible: visible
    }
}

export default messageReducer