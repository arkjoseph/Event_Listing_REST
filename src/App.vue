<script setup>
import { inject } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/EventCard.vue'

const GStore = inject('GStore') // Flash message
</script>

<template>
  <header>
  <div id="notice alert" v-if="GStore.flashMessage">{{ GStore.flashMessage }}</div>
    <div id="layout">
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list' }">Home</RouterLink> *
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h2 {
  font-size: 20px;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
