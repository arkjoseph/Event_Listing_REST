<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventListStore } from '@/stores/eventList.js'

import EventCard from '@/components/EventCard.vue'
import EventForm from '@/components/EventForm.vue'

import EventService from '@/services/service.js'

const props = defineProps(['page'])

const page = computed(() => props.page)
const totalEvents = ref(0)
const totalPages = ref(0)
const nextPage = ref(0)
const router = useRouter()
//@Computed
const hasNextPage = computed(() => {
  // API Response
  return nextPage.value !== null
})
//LifeCycle hook
onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(10, props.page)
      .then((response) => {
        console.log('API Response:', response.data)


        let eventsData = []

        if (response.data && response.data.data) {
          eventsData = response.data.data
        } else {
          eventsData = response.data
        }

        // Sort by timestamp if available (newest first)
        eventsData = [...eventsData].sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt)
          }
          return 0 // Don't change order if no timestamps
        })

        events.value = eventsData

        events.value = response.data

        // server provided responses for pagination
        if (response.data && response.data.data) {
          events.value = response.data.data
          totalEvents.value = response.data.items
          totalPages.value = response.data.pages
          nextPage.value = response.data.next
        }
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })
  })
})

// StoreToRefs for reactivity
const store = useEventListStore()
const { events } = storeToRefs(store)
</script>

<template>
  <div>
    <h1>All the events for you</h1>
    <div class="events">
      <div class="event-form">
        <EventForm></EventForm>
      </div>

      <EventCard v-for="event in events" :key="event.id" :event="event" />

      <div class="pagination">
        <router-link
          id="page-prev"
          v-if="page != 1"
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          >&#60; Prev Page
        </router-link>
        {{ page }}
        <router-link
          id="page-next"
          v-if="hasNextPage"
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          >Next Page &#62;
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
h1 {
  text-align: center;
}

.events {
  width: 340px;
  margin: 0 auto;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 300px;

  a {
    flex: 1;
    text-decoration: none;
  }

  #page-next {
    text-align: right;
  }

  #page-prev {
    text-align: left;
  }
}
</style>
