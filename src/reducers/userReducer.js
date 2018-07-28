const initialState = {
    user: {
        loggedIn: JSON.parse(window.sessionStorage.getItem('loggedInOptUser')),
    }
}

const userReducer = (store = initialState.user, action) => {
    console.log(window.sessionStorage.getItem('loggedInOptUser'))
    console.log(action.type)
    if (action.type === 'SET_LOGGED_USER') {
        console.log(action)
        return { ...store, loggedIn: action.loggedUser }
    }
    return store
}

export const login = (user) => {
    window.sessionStorage.setItem('loggedInOptUser', JSON.stringify(user))
    return async (dispatch) => {
        dispatch({
            type: 'SET_LOGGED_USER',
            loggedUser: user,
        })
    }
}

export const logout = () => {
    window.sessionStorage.setItem('loggedInOptUser', null)
    return async (dispatch) => {
        dispatch({
            type: 'SET_LOGGED_USER',
            loggedUser: null,
        })
    }
}

export default userReducer