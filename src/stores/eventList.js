import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import EventService from '@/services/service.js'
const router = useRouter()
export const useEventListStore = defineStore('events', {
  // state
  state: () => ({
    events: [],
    id: 0,
    loading: false,
    error: null,
    offset: 0,
    limit: 10,
    hasMoreEvents: true
  }),

  getters: {
    addEvent(title) {
      const newEvent = { title, id: this.id++, completed: false }

      this.events = [newEvent, ...this.events]
    },


  },

  actions: {
    //////// API Actions /////////
    async deleteEvent(itemId) {
      try {
        // Optimistic Update to the local state
        const deletedEvent = this.events.find((event) => {
          event.id === itemId
        })
        this.events = this.events.filter((object) => {
          return object.id !== itemId
        })
        await EventService.deleteEvent(itemId);

        // Return success without updating local state
        return {
          success: true,
          event: deletedEvent
        }
      } catch (error) {
        console.error('Error Deleting:', error)
        return {
          success: false,
          error: error.message || 'Failed to delete event'
        }
        // ToDo: fetch events again to restore state if delete fails
        // ToDo: Error handling
      }
    },

    async eventSelected() {
      return true
    },

    async toggleCompleted(id) {
      const event = this.events.find((obj) => obj.id === id)
      if (event) {
        const newStatus = !event.completed
        await this.updateEvent(id, {completed: newStatus})
        console.log('Toggle this', event)
      }
    },

    async fetchMoreEvents() {
      if (this.loading || !this.hasMoreEvents) return
      this.loading = true

      try {
        const response = await EventService.getEvents(this.limit, this.offset)

        let newEvents = []
        // server provided responses for pagination
        if (response.data && response.data.data) {
          newEvents = response.data.data
        } else {
          newEvents = response.data
        }
        // Fewer items? the end is near
        if (newEvents.length < this.limit) {
          this.hasMoreEvents = false
        }

        // Add new events to the array
        this.events = [...this.events, ...newEvents]

        // Update offset for next fetch
        this.offset += newEvents.length

        console.info("Returned Response: ", response)
        return newEvents;
      } catch (error) {
        await router.push({ name: 'network-error' })
        console.error('Error fetching events:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Reset store state (useful when navigating away and back)
    resetEvents() {
      this.events = []
      this.offset = 0
      this.hasMoreEvents = true
      this.error = null
    },

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

    // Update some data
    async updateEvent(eventId, updateEvent) {
      // We need the id to proceed
      if (!eventId) {
        throw new Error("Sorry, no event found")
      }
      // Find the event in the current state
      const eventIndex = this.events.findIndex(event => {
        return event.id === eventId
      })

      // Make a copy of the event with changes applied
      const updatedEvent = {
        ...this.events[eventIndex],
        ...updateEvent
      }

      this.events[eventIndex] = updatedEvent

      try {
        // Send the complete updated event to the server
        const response = EventService.updateEvent(eventId, updatedEvent)
        if (response.data && response) {
          console.log('server response: ',  response, response.data)
          this.events[eventIndex] = response.data
        } else {
          console.log('no data returned so we keep local data')
        }
        return this.events[eventIndex]
      } catch (error) {
        console.log('Error creating event:', error)
        throw error
      }
    }
  },
})
