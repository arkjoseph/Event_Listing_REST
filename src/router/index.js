import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventList.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetails from '@/views/EventDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
    },
    {
      path: '/event/:id', // Dynamic Segment
      props: true,
      name: 'event-details',
      component: EventDetails,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue'),

    },
  ],
})

export default router
