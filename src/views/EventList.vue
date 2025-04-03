<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, watchEffect } from 'vue'

import { useEventListStore } from '@/stores/eventList.js'

import EventCard from '@/components/EventCard.vue'
import EventForm from '@/components/EventForm.vue'


const props = defineProps(['page'])
const page = computed(() => props.page)

const nextPage = ref(0)
const router = useRouter()

// StoreToRefs for reactivity
const store = useEventListStore();

// Local refs instead of storeToRefs(store)
const events = ref([])
const loading = ref(false)

//@Computed
const hasNextPage = computed(() => {
  // API Response
  return nextPage.value !== null
})
// WatchEffect to run on component mount
watchEffect(() => {
  if (store && props.page) {
    loading.value = true
    store.fetchEvents(5, props.page)
      .then(() => {
        events.value = store.events
      })
      .catch((error) => {
        console.error('Error fetching events:', error)
        router.push(( { name: 'network-error' } ))
      })
  }
})

</script>

<template>
  <div>
    <h1>All the events for you</h1>
    <div class="events">
      <div class="event-form">
        <EventForm></EventForm>
      </div>
      <div v-if="loading && !events.length" class="loading">Loading events...</div>

      <template v-if="events && events.length">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </template>

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
