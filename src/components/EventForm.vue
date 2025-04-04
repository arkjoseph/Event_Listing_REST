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
    await store.createEvent({ title: title.value })
    title.value = ''
  } catch (error) {
    console.error('Failed to submit:', error)
  }
}
const clearForm = () => {
  if (title.value) {
    title.value = '';
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <textarea placeholder="Take a note..." v-model="title" type="text" />
    <button class="button">Add</button>
    <a @click="clearForm" class="clear button">cancel</a>
  </form>
</template>
<style scoped>
.button {
  cursor: pointer;
}
.clear {
  padding: 0 20px;
}
</style>
