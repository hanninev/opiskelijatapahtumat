import axios from 'axios'

const getAll =  async () => {
    const requestTekis = await axios.get('https://graph.facebook.com/v2.11/175686629125957/events?access_token=' + window.localStorage.getItem('user'))
    const tekis = requestTekis.data.data.map(i => {
    return { ...i, ainejärjestö: "TKO-äly ry"}
    })
    console.log(tekis)

    const requestMatrix = await axios.get('https://graph.facebook.com/v2.11/258975124205023/events?access_token=' + window.localStorage.getItem('user'))
    const matrix = requestMatrix.data.data.map(i => {
        return { ...i, ainejärjestö: "Matrix ry"}
        })

    console.log(requestMatrix.data)

    const request = tekis.concat(matrix)

    return request
}

export default { getAll }