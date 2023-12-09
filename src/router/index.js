// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/None.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home.vue'),
      },
    ],
  },
  {
    path: '/profile',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/profile/index.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/admin/index.vue'),
      },
    ],
  },
  {
    path: '/admin/activity',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/admin/activity.vue'),
      },
    ],
  },
  {
    path: '/admin/user',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/admin/user.vue'),
      },
    ],
  },
  {
    path: '/admin/message',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/admin/message.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/profile/activities',
        name: '',
        component: () => import('@/views/profile/activities.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/profile/activities-done',
        name: '',
        component: () => import('@/views/profile/activitiesDone.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/profile/gallery',
        name: '',
        component: () => import('@/views/profile/userGallery.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/profile/settings',
        name: '',
        component: () => import('@/views/profile/userSettings.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/None.vue'),
    children: [
      {
        path: '/login',
        name: '',
        component: () => import('@/views/userLogin.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () =>  import('@/layouts/default/None.vue'),
    children: [
      {
        path: '/register',
        name: '',
        component: () => import('@/views/userRegister.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
