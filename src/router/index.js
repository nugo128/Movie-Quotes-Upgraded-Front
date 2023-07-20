import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import NewsFeed from '../pages/NewsFeed.vue'
import UserProfile from '../pages/UserProfile.vue'
import MyMovies from '../pages/MyMovies.vue'
import MovieDescription from '../pages/MovieDescription.vue'
import ViewQuote from '../pages/ViewQuote.vue'
import NotFound from '../pages/NotFound.vue'
import NoPermission from '../pages/NoPermission.vue'
import { useUsersStore } from '../stores/user'
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
    },
    {
      path: '/movie-description',
      name: 'movie-description',
      component: MovieDescription
    },
    {
      path: '/view-quote',
      name: 'view-quote',
      component: ViewQuote
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/no-permission',
      name: 'no-permission',
      component: NoPermission
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useUsersStore()

  if (!store.authUser.length) {
    await store.getAuthUser()
  }

  if (
    !store.authUser.length &&
    (to.path === '/newsfeed' ||
      to.path === '/user-profile' ||
      to.path === '/my-movies' ||
      to.path === '/movie-description' ||
      to.path === '/view-quote')
  ) {
    next({ name: 'no-permission' })
  } else if (to.name === 'home' && store.authUser.length) {
    next({ name: 'news_feed' })
  } else {
    next()
  }
})
export default router
