import { createRouter, createWebHistory } from 'vue-router';

import MovieDetails from '../layouts/Movies.vue';

const routes = [
  {
    path: '/movies/:movieName',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;