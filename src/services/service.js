import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/arkjoseph/fake-api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  getEvents(perPage, page) {
    // Argument for this method...
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page )
  },
  getEvent(id) {
    // ID for this call
    return apiClient.get('/events/' + id)
  }
}
