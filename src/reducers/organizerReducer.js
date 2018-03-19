import eventService from '../services/events'

const reducer = (store = [], action) => {
  console.log(action.type)
    if (action.type === 'INIT_ORGANIZERS') {
        return action.data
    }

    return store
}

export const organizerInitialization = () => {
  return async (dispatch) => {
    const organizers = await eventService.getOrganizers()
  dispatch ({
    type: 'INIT_ORGANIZERS',
    data: organizers
  })
 }
}

export default reducer