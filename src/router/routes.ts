import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  { 
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    name: 'login'
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    name: 'home',
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'posts', component: () => import('pages/Post.vue'), name: 'posts' },
      { path: 'learning', component: () => import('pages/Learning.vue'), name: 'learning' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
