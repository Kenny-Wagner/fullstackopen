import axios from 'axios'
const baseUrl = 'https://ubiquitous-happiness-pp9666645g4f5p4-3001.app.github.dev/persons'

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