import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import NewsFeed from '../pages/NewsFeed.vue'
import UserProfile from '../pages/UserProfile.vue'
import MyMovies from '../pages/MyMovies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
      children: [
        { path: '/verify', component: LandingPage },
        { path: '/reset', component: LandingPage }
      ]
    },
    {
      path: '/newsfeed',
      name: 'news_feed',
      component: NewsFeed
    },
    {
      path: '/user-profile',
      name: 'user_profile',
      component: UserProfile
    },
    {
      path: '/my-movies',
      name: 'my-movies',
      component: MyMovies
    }
  ]
})

export default router
