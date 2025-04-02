import { defineStore } from 'pinia'
import EventService from '@/services/service.js'
export const useEventListStore = defineStore('events', {
  // state
  state: () => ({
    events: [],
    id: 0,
  }),

  // getters
  actions: {
    addEvent(title) {
      const newEvent = { title, id: this.id++, completed: false }

      this.events = [newEvent, ...this.events]
    },
    toggleCompleted(id) {
      const event = this.events.find((obj) => obj.id === id)
      if (event) {
        event.completed = !event.completed
      }
    },
    // actions
    deleteEvent(itemId) {
      this.events = this.events.filter((object) => {
        return object.id !== itemId
      })
    },

    // API Actions
    async createEvent(eventData) {
      try {
        const newEvent = { ...eventData, completed: false }

        const response = await EventService.createEvent(newEvent)

        // Server Response
        this.events = [response.data, ...this.events]
        console.log('Created Event', newEvent)
        return response.data
      } catch (error) {
        console.log('Error creating event:', error)
        throw error
      }
    },
  },
})
