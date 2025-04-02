<script setup>
import { ref } from 'vue'
import { useEventListStore } from '@/stores/eventList.js'

// Field values
const title = ref('')
// Pinia
const store = useEventListStore()

// Submit form
const submitForm = async () => {
  if (!title.value || title.value.trim().length === 0) {
    return
  }
  try {
    await store.createEvent( {  title: title.value } )
    title.value = ''
  } catch (error) {
    console.error('Failed to submit:', error);
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input placeholder="Event Title" v-model="title" type="text" />
    <button>Add</button>
  </form>
</template>
<style scoped></style>
