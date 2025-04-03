import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import EventService from '@/services/service.js'
const router = useRouter()
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

    //////// API Actions /////////
    // Fetch some data
    async fetchEvents(perPage, page) {
      this.loading = true
      this.error = null

      try {
        const response = await EventService.getEvents(perPage, page)
        // server provided responses for pagination
        if (response.data && response.data.data) {
          this.events = response.data.data
          // totalEvents.value = response.data.items
          // totalPages.value = response.data.pages
          // nextPage.value = response.data.next
        }
        console.info("Returned Response: ", response)
        return response;
      } catch (error) {
        await router.push({ name: 'network-error' })
        console.error('Error fetching events:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    // Create some data
    async createEvent(eventData) {
      try {
        const newEvent = {
          ...eventData,
          completed: false,
          createdAt: new Date().toISOString()
        }

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
