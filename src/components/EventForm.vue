<script setup>
import {ref} from 'vue'
import {useEventListStore} from '@/stores/eventList.js'

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
    await store.createEvent({title: title.value})
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
  <v-card elevation="3" class="mb-6" cols="12">
    <v-form @submit.prevent="submitForm">
      <v-textarea label="Take a note" v-model="title" type="text"/>
      <v-btn @click="submitForm" variant="elevated" class="button">Add</v-btn>
      <v-btn variant="text" @click="clearForm" class="clear button">cancel</v-btn>
    </v-form>
  </v-card>
</template>
<style scoped>
.button {
  cursor: pointer;
}

.clear {
  padding: 0 20px;
}
</style>
