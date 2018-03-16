import axios from 'axios'

const getUser =  async () => {
    const request = await axios.get('https://graph.facebook.com/v2.11/me?fields=id,name&access_token=' + window.localStorage.getItem('user'))
     console.log(request)
    return request
}

export default { getUser }