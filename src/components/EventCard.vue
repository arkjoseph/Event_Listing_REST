<script setup>
import { RouterLink } from 'vue-router'
// import { storeToRefs } from 'pinia'
import { useEventListStore } from '@/stores/eventList.js'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})

// // StoreToRefs for reactivity
const store = useEventListStore();
const { toggleCompleted, deleteEvent } = store;
</script>

<template>

    <div class="event-card listings" :class="{ completed: event.completed }">
      <h2>
        <RouterLink :to="{ name: 'event-details', params: { id: event.id } }">
          {{ event.title }}
        </RouterLink>
      </h2>

      <p>@{{ event.time }} on {{ event.date }}</p>
      <div class="card_buttons">
        <span @click.stop="toggleCompleted(event.id)">&#10004;</span>
        <span @click="deleteEvent(event.id)">&#10060;</span>
      </div>
    </div>
</template>

<style>
.event-card {
  padding: 20px;
  width: 100%; /* Change from fixed width to 100% */
  border: 1px solid #39495c;
  height: 100%; /* Fill the height given by VirtualScroller */
  box-sizing: border-box; /* Include padding in height calculation */
  .card_buttons span {
    cursor: pointer;
  }
  &.completed {
    background: blueviolet;
  }
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
