import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: '', component: () => import('@/views/HomeView.vue') },
        { path: 'login', component: () => import('@/views/auth/LoginView.vue') },
        { path: 'register', component: () => import('@/views/auth/RegisterView.vue') },
      ],
    },
  ],
})
