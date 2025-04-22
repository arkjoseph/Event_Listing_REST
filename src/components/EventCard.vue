<script setup>
import { inject, ref } from 'vue'
import { useEventListStore } from '@/stores/eventList.js'
import CKEditor from '@/components/editor.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

// // StoreToRefs for reactivity
const store = useEventListStore()
const { toggleCompleted, updateTitle } = store
const GStore = inject('GStore')

const title = ref('')
const dialog = ref(false)
const openEditDialog = () => {
  // Initialize
  title.value = props.event.title

  dialog.value = true
}

const handleUpdateTitle = async (eventId) => {
  console.log('Title Update: ',title.value)
  console.log('ID Update: ',props.event.id)
  try {
    await store.saveTitle(props.event.id, title.value)
    dialog.value = false
  } catch (error) {
    console.error('Failed to submit:', error)
  }
}
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
<!--          <RouterLink :to="{ name: 'event-details', params: { id: event.id } }">-->
<!--            {{ event.title }}-->
<!--          </RouterLink>-->
          <v-card-title @click="openEditDialog" style="cursor: pointer">
            {{ event.title }}
          </v-card-title>

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

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>Edit</v-card-title>
                <CKEditor v-model="title" tag-name="textarea"/>
<!--                <v-textarea-->
<!--                  v-model="title"-->
<!--                  label="Edit Note"-->
<!--                  variant="outlined"></v-textarea>-->
              <v-card-actions>
                <v-btn @click="handleUpdateTitle(event.id)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
