import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/splash',
    },
    {
      path: '/splash',
      name: 'splash',
      component: () => import('@/views/SplashView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('@/views/NotesView.vue'),
    },
    {
      path: '/notes/:id',
      name: 'note-detail',
      component: () => import('@/views/NoteDetailView.vue'),
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('@/views/TicketsView.vue'),
    },
    {
      path: '/issues',
      name: 'issues',
      component: () => import('@/views/IssuesView.vue'),
    },
  ],
})

export default router
