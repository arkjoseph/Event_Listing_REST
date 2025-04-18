<script setup>
import { RouterLink } from 'vue-router'
import { inject, ref } from 'vue'
import { useEventListStore } from '@/stores/eventList.js'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

// // StoreToRefs for reactivity
const store = useEventListStore()
const { toggleCompleted, eventSelected } = store
const GStore = inject('GStore')
//const event_selected = ref(true)
const deleteButton = async (eventId) => {
  try {
    const result = await store.deleteEvent(eventId)
    GStore.flashMessage = `Event was successfully deleted.`

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 5000)
  } catch (error) {
    // Show error message
    GStore.flashMessage = `Error: ${error.message || 'Failed to delete event'}`

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)
  }
}
</script>

<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6">
      <v-card elevation="3" class="mb-4">
        <v-card-text class="event-card listings" :class="{ completed: event.completed }" title="{{ event.title }}">
          <RouterLink :to="{ name: 'event-details', params: { id: event.id } }">
            {{ event.title }}
          </RouterLink>

          <div class="card_buttons">
            <v-btn
              @click.stop="toggleCompleted(event.id)"
              class="ma-2"
              color="primary"
            >Completed  <v-icon color="white" icon="mdi-checkbox-marked-circle" end></v-icon></v-btn>

            <v-btn
              class="ma-2"
              color="red"
              @click="deleteButton(event.id)"
            >Trash  <v-icon color="white" icon="mdi-delete" end></v-icon></v-btn>

          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.completed {
  background-color: #39495c;
}
</style>
