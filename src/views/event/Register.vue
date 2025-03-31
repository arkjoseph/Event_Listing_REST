<script setup>
import { defineProps, inject } from 'vue'
import { useRouter } from 'vue-router'

const { event } = defineProps(['event'])
const router = useRouter()
const GStore = inject('GStore')
const register = () => {
  // API ...>

  // If successfull
  GStore.flashMessage = 'You are successfully registered for ' + event.title
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 5000)

  router.push({
    name: 'event-details',
  })
}
</script>

<template>
  <div class="events">
    <div class="event-card register-event">
      <p>Register for Event</p>
      <button class="button" @click="register">Register Me</button>
    </div>
  </div>
</template>

<style scoped>
.button {
  width: 100%;
  background: #ffdf8f;
  border: 3px solid white;
  padding: 10px;
  cursor: pointer;
  &:focus {
    border: 3px solid #817362;

  }
}
</style>
