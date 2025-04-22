<template>
  <ckeditor
    v-if="editor"
    :editor="editor"
    :config="config"
    v-model="editorData"
    @input="updateContent"
  />
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits, watch } from 'vue'
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';

const props = defineProps({
  event: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:event'])
const editorData = ref(props.event || '')

// Watching
watch(() => props.event, (newEvent) => {
  if (newEvent !== editorData.value) {
    editorData.value = newEvent
  }
})

// Update parent component when values change
const updateContent = () => {
  emit('update:event', editorData.value)
}

const cloud = useCKEditorCloud( {
  version: '45.0.0',
  premium: false
} );

const editor = computed( () => {
  if ( !cloud.data.value ) {
    return null;
  }

  return cloud.data.value.CKEditor.ClassicEditor;
} );

const config = computed( () => {
  if ( !cloud.data.value ) {
    return null;
  }

  const { Essentials, Paragraph, Bold, Italic } = cloud.data.value.CKEditor;

  return {
    licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzY5MDIzOTksImp0aSI6ImRkYjIwOTc0LWVkZTQtNDk3ZS04MWJjLWE4OTM1NDhiZDI2MiIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiMzYwMzM2NTMifQ.Bk4lZOBhg-SNQcQ5VoOIAxQ87i3QeuwSQ9XoEAj3CRmRO2dbFQpoG-NIYC2Zm5SPe1pXjmwIVyHBhYRiXo-ETw',
    plugins: [ Essentials, Paragraph, Bold, Italic ],
    toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ]
  };
} );
</script>
