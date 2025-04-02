import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  createEvent(eventData) {
    return apiClient.post('/events', eventData)
  },
  getEvents(perPage, page) {
    // Updated to use _per_page instead of _limit
    return apiClient.get(`/events?_per_page=${perPage}&_page=${page}`)
    //return apiClient.get(`/events?_sort=-id`)
  },
  getEvent(id) {
    // ID for this call
    return apiClient.get(`/events/${id}`)
  }
}
