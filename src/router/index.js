import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import NewsFeed from '../pages/NewsFeed.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
      children: [{ path: '/verify', component: LandingPage }]
    },
    {
      path: '/newsfeed',
      name: 'news_feed',
      component: NewsFeed
    }
  ]
})

export default router
