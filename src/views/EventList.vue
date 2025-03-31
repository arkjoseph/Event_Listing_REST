<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/service.js'
import { useRouter } from 'vue-router'

const props = defineProps(['page'])
const events = ref(null)
const page = computed(() => props.page)
const totalEvents = ref(0)
const router = useRouter()
// @Computed
const hasNextPage = computed(() => {
  // Calculate total pages based on the amount per page
  const totalPages = Math.ceil(totalEvents.value / 2)

  // If page is less than total pages return true
  return page.value < totalPages
})
const fetchEvents = () => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(2, props.page)
      .then((response) => {
        events.value = response.data
        // We are expecting the header
        totalEvents.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })
  })
}
//LifeCycle hook
onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <div>
    <h1>All the events for you</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <div class="pagination">
        <router-link id="page-prev" v-if="page != 1" :to="{ name: 'event-list', query: { page: page - 1 } }"
          >Prev Page
        </router-link>
        <router-link id="page-next" v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }"
          >Next Page
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
  background: #eaeaea;
  width: 340px;
  margin: 0 auto;
  padding: 6px;
  border: 1px solid #c7c7c7;

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
  #page-next {text-align: right}
  #page-prev {text-align: left}
}
</style>
