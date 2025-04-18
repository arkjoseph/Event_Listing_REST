<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/service.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const { id } = defineProps(['id'])
const event = ref(null)
//LifeCycle hook
onMounted(() => {
  EventService.getEvent(id)
    .then((response) => {
      event.value = response.data
      console.log(response.data)
    })
    .catch((error) => {
      // Route to 404 page for wrong event id's
      if (error.response) {
        router.push({
          name: '404Resource',
          params: { resource: 'event' },
        })
      }
      if (error.response && error.response.status === 404) {
        router.push({ name: 'network-error' })
      }
      return false
    })
})
</script>

<template>
  <v-app>
    <v-main v-if="event">
      <h1>{{ event.title }}</h1>

      <nav>
        <ul id="sub-nav">
          <li>
            <router-link :to="{ name: 'event-details' }">Details</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'event-register' }">Register</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'event-edit' }">Edit</router-link>
          </li>
        </ul>
      </nav>

      <router-view :event="event" />
    </v-main>
  </v-app>
</template>

<style>
h1,
#sub-nav {
  text-align: center;
}

#sub-nav li a {
  border: 1px solid gainsboro;
  padding: 7px;

  &:hover {
    background: #2c3e50;
    color: white;
  }
}
</style>
