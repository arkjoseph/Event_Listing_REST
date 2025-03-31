<script setup>
defineProps(['event'])
</script>

<template>
  <div class="events">
    <div class="event-card">
      <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
