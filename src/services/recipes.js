import axios from 'axios'
const baseURL = 'http://localhost:3000/recipes'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(id, newObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    update
}