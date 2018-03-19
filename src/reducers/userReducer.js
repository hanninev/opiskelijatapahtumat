import userService from '../services/user'

const reducer = (store = [], action) => {
  console.log(action.type)
    if (action.type === 'INIT_USER') {
        return action.data
    }

    return store
}

export const userInitialization = () => {
  return async (dispatch) => {
    const user = await userService.getUser()
  dispatch ({
    type: 'INIT_USER',
    data: user.data.name
  })
 }
}

export default reducer