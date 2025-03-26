import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventList.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetails from '@/views/EventDetails.vue'
import NotFound from '@/views/404Page.vue'
import EventService from '@/services/service.js' // Axios Service

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
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

router.beforeEach(async  (to, from) => {
  if (to.name === 'event-details') {
    try {
      await EventService.getEvent(to.params.id)
      return true
      // eslint-disable-next-line no-unused-vars
    } catch(error) {
      return { name: 'not-found'}
    }
  }
})

export default router
