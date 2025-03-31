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
  <p>Register for Event</p>
  <button @click="register">Register Me</button>
</template>
