import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import Legendaries from "./views/Legendaries.vue";
import Pokedex from "./views/Pokedex.vue";
import Documentation from "./views/Documentation.vue";
import ErrorPage from "./views/ErrorPage.vue";

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/legendaries', name: 'Legendaries', component: Legendaries },
  { path: '/Pokedex', name: 'Pokedex', component: Pokedex },
  { path: '/Documentation', name: 'Documentation', component: Documentation },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
