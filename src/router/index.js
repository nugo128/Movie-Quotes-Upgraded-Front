import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import NewsFeed from '../pages/NewsFeed.vue'
import UserProfile from '../pages/UserProfile.vue'
import MyMovies from '../pages/MyMovies.vue'
import MovieDescription from '../pages/MovieDescription.vue'
import ViewQuote from '../pages/ViewQuote.vue'
import NotFound from '../pages/NotFound.vue'
import NoPermission from '../pages/NoPermission.vue'
import { useUsersStore } from '../stores/userStore'
import { getUser } from '../services'
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

  let data = []
  if (!store.authUser.length) {
    await store.getAuthUser()
    try {
      const response = await getUser()
      data.push(response.data)
    } catch (error) {
      data = []
    }
  }
  if (
    (!store.authUser.length || data.length) &&
    (to.path === '/my-movies' || to.path === '/movie-description' || to.path === '/view-quote')
  ) {
    await store.getAuthUser()
    console.log(store.authUser)
    next({ name: 'no-permission' })
  } else if (to.name === 'home' && store.authUser.length) {
    next({ name: 'news_feed' })
  } else {
    next()
  }
})
export default router
