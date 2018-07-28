import axios from 'axios'

const url = 'http://opiskelijatapahtumat-backend.herokuapp.com/api/login'
// const url = 'http://localhost:3001/'

const login = (user) => {
  const request = axios.post(url + '/', user)
  return request.then(response => { return response })
}

export default { login }