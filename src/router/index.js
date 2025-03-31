import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventList.vue'
import Details from '@/views/event/Details.vue'
import Register from '@/views/event/Register.vue'
import Edit from '@/views/event/Edit.vue'
import NotFound from '@/views/404Page.vue'
import EventLayout from '@/views/event/Layout.vue'
import NetworkError from '@/views/NetworkError.vue'

// Lazy load 1 example page
const About = () => import(/* webpackChunkName: "about" */'../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:  [
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
      component: EventLayout,
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
      component: About,
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // <----
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})



export default router
