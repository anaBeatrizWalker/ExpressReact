import axios from 'axios'

const api_express = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 30000,
    headers: {'Content-Type': 'application/json'}
})
export default api_express