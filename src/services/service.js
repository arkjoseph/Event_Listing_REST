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
  updateEvent(id, eventData) {
    return apiClient.put(`/events/${id}`, eventData)
  },
  getEvents(limit = 2, offset = 0) {
    // Updated to use _per_page instead of _limit
    return apiClient.get(`/events?_limit=${limit}&_start=${offset}&_sort=-createdAt`)
    //return apiClient.get(`/events?_sort=-createdAt`)
  },
  getEvent(id) {
    // ID for this call
    return apiClient.get(`/events/${id}`)
  },
  deleteEvent(id) {
    // ID for this call
    return apiClient.delete(`/events/${id}`)
  }
}
