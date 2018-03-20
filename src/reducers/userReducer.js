const reducer = (store = [], action) => {
  console.log(action.type)
  if (action.type === 'SET_USER') {
    console.log(action)
    return action.user
  }

  return store
}

export const userCreation = (value) => {
  console.log(value)
  return {
    type: 'SET_USER',
    user: value
  }
}

export default reducer