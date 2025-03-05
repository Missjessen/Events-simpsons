import { createRouter, createWebHistory } from 'vue-router';

const simpsonsRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Home',
      component: () => import('../views/SimpsonsHomeView.vue'),
    },

    {
      path: '/Events',
      name: 'events',
      component: () => import('../views/SimpsonsEventsView.vue'), // Ensure this file exists at the specified path
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/admin/AuthView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
    }
  ]
});

export default simpsonsRouter;
