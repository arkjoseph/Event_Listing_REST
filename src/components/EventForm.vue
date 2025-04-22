<script setup>
import {ref} from 'vue'
import {useEventListStore} from '@/stores/eventList.js'
import Ckeditor from '@/components/editor.vue'
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})
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
    dialog.value = false
  } catch (error) {
    console.error('Failed to submit:', error)
  }
}
const clearForm = () => {
  if (title.value) {
    title.value = '';
  }
}
const title = ref('')
const dialog = ref(false)
const openEditDialog = () => {
  // Initialize
  dialog.value = true
}

</script>

<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="12">
      <v-card elevation="3" class="mb-6">
        <v-card-text class="event-card listings" title="Add a note">
          <v-card-title @click="openEditDialog" style="cursor: pointer">
            Add your notes
          </v-card-title>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
<!--  <v-card elevation="3" class="mb-6" cols="12">-->
<!--    <v-form @submit.prevent="submitForm">-->
<!--      <v-textarea label="Take a note" v-model="title" type="text"/>-->
<!--      <v-btn @click="submitForm" variant="elevated" class="button">Add</v-btn>-->
<!--      <v-btn variant="text" @click="clearForm" class="clear button">cancel</v-btn>-->
<!--    </v-form>-->
<!--  </v-card>-->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Add notes</v-card-title>
      <ckeditor :editor="editor" tag-name="textarea"/>
      <v-textarea
        v-model="title"
        label="Add Note"
        variant="outlined"></v-textarea>
      <v-card-actions>
        <v-btn @click="submitForm()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.button {
  cursor: pointer;
}

.clear {
  padding: 0 20px;
}
</style>
