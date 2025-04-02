<script setup>
import { storeToRefs } from "pinia"
import { useEventListStore } from '@/stores/eventList.js'

import { RouterLink } from 'vue-router'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})

// StoreToRefs for reactivity
const store = useEventListStore();
const { events } = storeToRefs(store)

// destructure action
const { toggleCompleted, deleteEvent } = store

</script>

<template>
    <div class="event-card listings" :class="{ completed: event.completed }">
      <h2>
        <RouterLink :to="{ name: 'event-details', params: { id: event.id } }">
          {{ event.title }}
        </RouterLink>
      </h2>

      <p>@{{ event.time }} on {{ event.date }}</p>
      <span @click.stop="toggleCompleted(event.id)">&#10004;</span>
      <span @click="deleteEvent(event.id)">&#10060;</span>
    </div>
</template>

<style>
.event-card {
  padding: 20px;
  width: 250px;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card {
  &.listings h2:hover {
    transform: scale(1.07);
  }
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  &.completed {
    background: darkblue;
    a,p {
      color: white;
    }
  }
}
</style>
