import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventList.vue'
import AboutView from '@/views/AboutView.vue'
import Details from '@/views/event/Details.vue'
import Register from '@/views/event/Register.vue'
import Edit from '@/views/event/Edit.vue'
import NotFound from '@/views/404Page.vue'
import Eventlayout from '@/views/event/Layout.vue'
import NetworkError from '@/views/NetworkError.vue'

//import EventService from '@/services/service.js' // Axios Service

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/events/:id', // Dynamic Segment
      props: true,
      name: 'event-layout',
      component: Eventlayout,
      children: [
        {
          path: '', // Dynamic Segment
          name: 'event-details',
          component: Details,
        },
        {
          path: 'register', // Dynamic Segment
          props: true,
          name: 'event-register',
          component: Register,
        },
        {
          path: 'edit', // Dynamic Segment
          props: true,
          name: 'event-edit',
          component: Edit,
        },
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      },
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
      // alias: '/about'
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/about',
      redirect: { name: 'about' }
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError
    }
  ],
  scrollBehavior() {
    return top;
  }
})

// router.beforeEach(async (to, from) => {
//   if (to.name === 'event-details') {
//     try {
//       await EventService.getEvent(to.params.id)
//       return true
//       // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       return { name: 'not-found' }
//     }
//   }
// })

export default router
