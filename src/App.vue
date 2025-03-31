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
          <ul>
            <li><RouterLink :to="{ name: 'event-list' }">Home</RouterLink></li>
            <li><RouterLink :to="{ name: 'about' }">About</RouterLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#layout,
h2 {
  text-align: center;
  color: #2c3e50;
}
h2 {
  font-size: 20px;
}
nav {
  padding: 30px 0;
  ul {
    padding: 0;
    list-style: none;
    li {
      display: inline-grid;
      margin: 0 20px 0 0;
    }
  }
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
