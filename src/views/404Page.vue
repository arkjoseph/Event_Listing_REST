<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
})
</script>
<template>
  <div class="about">
    <h1>ERROR 404 - OOPS, not found</h1>
    <p>The {{ resource }} was not found</p>
<!--    <router-link :to="{ name: 'event-details'}">Back to home page</router-link>-->
  </div>
</template>

