<script setup>
import { ref } from 'vue'
import { useEventListStore } from '@/stores/eventList.js'

const event = ref('')
const title = ref('')
const id = ref("0")
// Pinia
const store = useEventListStore()

function addItemAndClear(item) {
  if (item.length === 0) {
    return
  }
  // invokes function in the store:
  //store.addEvent(item)
  event.value = ''
}
const submitForm = async () => {
  addItemAndClear(event)
  try {
    await store.createEvent( {  title: title.value, id: id.value } )
   // console.log(this.event)
  } catch (error) {
    console.error('Failed to submit:', error);
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input placeholder="Event Title" v-model="event" type="text" />
    <button>Add</button>
  </form>
</template>
<style scoped></style>
