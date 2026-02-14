import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PokemonView from '@/views/PokemonView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pokemonName',
      name: 'pokemon-detail',
      component: PokemonView,
      props: (route) => ({ pokemonName: route.params.pokemonName })
    },
    {
      path: '/resources',
      name: 'view-resources',
      component: ResourcesView
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for 404
      name: 'view-error',
      component: ErrorView
    }
  ]
})

export default router
