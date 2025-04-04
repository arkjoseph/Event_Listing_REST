<script setup>
import { computed, onMounted, onActivated } from 'vue'
import { storeToRefs } from 'pinia'

import { useEventListStore } from '@/stores/eventList.js'

import EventCard from '@/components/EventCard.vue'
import EventForm from '@/components/EventForm.vue'
import VirtualScroller from '@/components/VirtualScroller.vue'

// StoreToRefs for reactivity
const store = useEventListStore();
const { events, loading, hasMoreEvents } = storeToRefs(store)

onMounted(() => {
  // Reset store when component is first mounted
  store.resetEvents()
  store.fetchMoreEvents()
})
onActivated(() => {
  if (events.value.length === 0) {
    store.fetchMoreEvents()
  }
})

// Handle loading more events when scrolling
function handleLoadMore() {
  if (!loading.value && hasMoreEvents.value) {
    store.fetchMoreEvents()
  }
}

</script>

<template>
  <div>
    <h1>All the events for you</h1>
    <div class="events">
      <div class="event-form">
        <EventForm></EventForm>
      </div>
      <div v-if="loading && !events.length" class="loading">Loading events...</div>

      <VirtualScroller
        :items="events"
        :itemHeight="160"
        :containerHeight="600"
        :bufferSize="3"
        @loadMore="handleLoadMore"
      >
        <template #item="{ item }">
          <EventCard :event="item" />
        </template>
      </VirtualScroller>

      <div v-if="loading && events.length > 0" class="loading-more">
        Loading more events...
      </div>

      <div v-if="!hasMoreEvents && events.length > 0" class="no-more-events">
        No more events to load
      </div>

    </div>
  </div>
</template>

<style>
h1 {
  text-align: center;
}

.loading, .loading-more, .no-more-events {
  text-align: center;
  padding: 20px;
}

.loading-more {
  margin-top: 10px;
}

.event-form {
  width: 100%;
  max-width: 340px;
  margin: 0 auto 20px auto;
}
</style>
