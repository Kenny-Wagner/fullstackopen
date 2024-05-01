import axios from 'axios'
const baseUrl = 'https://ubiquitous-happiness-pp9666645g4f5p4-3001.app.github.dev/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This not is not saved to server',
        important:true,
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }