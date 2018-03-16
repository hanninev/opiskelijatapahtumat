import axios from 'axios'

const getAll =  async () => {
    const requestTekis = await axios.get('https://graph.facebook.com/v2.11/175686629125957/events?access_token=' + window.localStorage.getItem('user'))
    const tekis = requestTekis.data.data.map(i => {
    return { ...i, organizer: "TKO-äly"}
    })
    console.log(tekis)

    const requestMatrix = await axios.get('https://graph.facebook.com/v2.11/258975124205023/events?access_token=' + window.localStorage.getItem('user'))
    const matrix = requestMatrix.data.data.map(i => {
        return { ...i, organizer: "Matrix"}
        })

    const requestKannunvalajat = await axios.get('https://graph.facebook.com/v2.11/103357879701983/events?access_token=' + window.localStorage.getItem('user'))
    const kannunvalajat = requestKannunvalajat.data.data.map(i => {
        return { ...i, organizer: "Kannunvalajat"}
        })

    console.log(requestMatrix.data)

    const request = tekis.concat(matrix).concat(kannunvalajat)

    return request
}

export default { getAll }