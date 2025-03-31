<script setup>
//import { ref } from 'vue'

import { RouterLink } from 'vue-router'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="{ name: 'event-details', params: { id: event.id } }">
    <div class="event-card listings">
      <h2>{{ event.title }}</h2>

      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
    </RouterLink>
</template>

<style>
.event-card {
  padding: 20px;
  width: 250px;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card {
  &.listings:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
