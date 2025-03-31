<script setup>
defineProps(['event'])
</script>

<template>
  <div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.location }}</p>
  </div>
</template>
