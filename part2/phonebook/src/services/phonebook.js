import axios from 'axios'

// let applicationHost = 'default'
// console.log(`env val is ${import.meta.env.VITE_CODESPACE_NAME} and has type ${typeof(import.meta.env.VITE_CODESPACE_NAME)}`)

// if (import.meta.env.VITE_CODESPACE_NAME !== '') {
//     applicationHost = `https://${import.meta.env.VITE_CODESPACE_NAME}-3001.app.github.dev`
// }
// else {
//     applicationHost = 'http://localhost:3001'
// }

// console.log(`fetching data on domain ${applicationHost}`)

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newEntry => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const update = (id, entry) => {
    const request = axios.put(`${baseUrl}/${id}`, entry)
    return request.then(response => response.data)
}
const deleteEntry = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deleteEntry }