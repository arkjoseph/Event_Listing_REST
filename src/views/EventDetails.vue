<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/service.js'

const props = defineProps({
  id: { required: true }
})
const event = ref(null)
//LifeCycle hook
onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error)
      return false
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.location }}</p>
  </div>
</template>
